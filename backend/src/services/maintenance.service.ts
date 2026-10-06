import { SystemSettings, systemSettings } from "@/models/SystemSettings";

class MaintenanceService {

    constructor(
        private readonly systemSettings: SystemSettings
    ) {}

    getSettings = async () => {
        const settings = await this.systemSettings.findByPrefix("maintenance.");

        const settingsMap = Object.fromEntries(
            settings.map((setting) => [
                setting.setting_key,
                setting.value
            ])
        );

        return {
            enabled: settingsMap["maintenance.enabled"] ?? false,
            message: settingsMap["maintenance.message"] ?? "",
        };
    };
};

export default new MaintenanceService(systemSettings);