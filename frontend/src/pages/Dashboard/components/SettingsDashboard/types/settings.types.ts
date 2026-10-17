export type OriginalMaintenanceSettingsState = {
    enabled: boolean;
    message: string;
};

export type MaintenanceSettingsState = {
    enabled: boolean | null;
    message: string | null;
};

export type SettingsState = {
    maintenance: MaintenanceSettingsState
};

export type SettingValue = string | number | boolean | null;

export type GeneralFailure = {
    message: string
};

export type SettingsFailure = {
    key: string
    message: string
}