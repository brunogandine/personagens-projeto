import { prisma } from "@/libs/prisma";
import { UpdateMaintenanceModelError, UpdateMaintenanceModelSuccess, UpdateMaintenanceOperationResponse, UpdateMaintenanceSettings } from "@/types/settings.types";
import { parseSystemSettingsValue } from "@/utils/parseSystemSettingValue";
import { Prisma } from "@prisma/client";

export class SystemSettings {
    findByPrefix = async (prefix: string) => {
        const results = await prisma.systemSettings.findMany({
            where: {
                setting_key: {
                    startsWith: prefix
                }
            }
        });

        return results.map((res) => ({
            ...res,
            value: parseSystemSettingsValue(res.value, res.data_type)
        }));
    };

    updateSettings = async (data: UpdateMaintenanceSettings) => {
        const errors: UpdateMaintenanceModelError = [];
        const successes: UpdateMaintenanceModelSuccess = [];

        for(const [key, value] of Object.entries(data)) {
            try {
                await prisma.systemSettings.update({
                    where: {
                        setting_key: key
                    },
                    data: {
                        value: String(value)
                    }
                });

                successes.push({ key: key });
            } catch(err) {
                if(err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
                    errors.push({
                        code: err.code,
                        key,
                    });

                    continue;
                } else {
                    errors.push({code: "internal", key});

                    return { successes, errors };
                };
            };
        };

        return { successes, errors };
    };
};

export const systemSettings = new SystemSettings();