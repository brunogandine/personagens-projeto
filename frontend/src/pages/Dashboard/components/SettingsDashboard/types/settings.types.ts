export type OriginalMaintenanceSettingsState = {
    enabled: boolean;
    message: string;
};

export type MaintenanceSettingsState = {
    enabled: boolean | null;
    message: string | null;
}