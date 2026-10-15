import type { MaintenanceSettingsState } from "@/pages/Dashboard/components/SettingsDashboard/types/settings.types";

type MaintenanceSettingsChanges = {
    enabled?: boolean | null;
    message?: string | null;
};

export type SettingsSaveOperation = {
    endpoint: string;
    payload: Record<string, unknown>
}

export const builderMaintenanceSave = (original: MaintenanceSettingsState, current: MaintenanceSettingsState): SettingsSaveOperation | null => {
    const payload: MaintenanceSettingsChanges = {};

    if(current.enabled !== original.enabled) {
        payload.enabled = current.enabled;
    };

    if(current.message !== original.message) {
        payload.message = current.message;
    };

    if(Object.keys(payload).length === 0)
        return null;

    return {
        endpoint: "/settings/maintenance",
        payload     
    };
};