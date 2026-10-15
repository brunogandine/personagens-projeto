import { SystemSettings, systemSettings } from "@/models/SystemSettings";
import { UpdateMaintenanceSchema } from "@/validations/maintenance.validations";

const settingsMap = {
    enabled: "maintenance.enabled",
    message: "maintenance.message"
}
class MaintenanceService {

    constructor(
        private readonly systemSettings: SystemSettings
    ) {}

    getSettings = async () => {
        const settings = await this.systemSettings.findByPrefix("maintenance.");

        console.log(settings)

        if(settings.length === 0) {
            throw { type: "not_found", message: "Uma ou mais configurações não existem na base de dados."}
        };

        const settingsMapper = Object.fromEntries(
            settings.map((setting) => [
                setting.setting_key.split(".")[1],
                setting.value
            ])
        );

        return settingsMapper;
    };

    updateSettings = async (payload: UpdateMaintenanceSchema) => {
        const normalizedErrors = [];

        const settings = Object.fromEntries(
            Object.entries(payload)
                .filter(([, value]) => value !== undefined)
                .map(([key, value]) => [
                    settingsMap[key as keyof typeof settingsMap],
                    value
                ])
        );

        const cfgCount = Object.keys(settings).length;

        const { successes, errors } = await this.systemSettings.updateSettings(settings);

        if(errors.length > 0) {
            if(errors.length === cfgCount) {
                const notFoundErrors = errors.filter((error) =>  error.code === "P2025");

                if(notFoundErrors.length === cfgCount) 
                    throw {type: "not_found", keys: notFoundErrors.map((error) => error.key), message: "Nenhuma das configurações enviadas existe na base de dados."};
            };

            for(const error of errors) {
                if(error.code === "P2025") {
                    normalizedErrors.push({type: "not_found", key: error.key, message: `A configuração ${error.key} não foi encontrada.`});

                    continue;
                }

                normalizedErrors.push({type: "internal", key: error.key, message: `Erro Interno ao processar a configuração ${error.key}.`});

                continue;
            };
        };

        if(normalizedErrors.some((error) =>  error.type === "internal")) {
            throw { successes, errors: normalizedErrors };
        };

        return { successes, errors: normalizedErrors };
    };
};

export default new MaintenanceService(systemSettings);