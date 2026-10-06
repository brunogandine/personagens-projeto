import { prisma } from "@/libs/prisma";
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
};

export const systemSettings = new SystemSettings();