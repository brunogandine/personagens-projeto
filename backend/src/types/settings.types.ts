export type GetMaintenanceSettings = {
    prefix: "maintenance."
};

export type UpdateMaintenanceSettings = {
    "maintenance.enabled"?: boolean;
    "maintenance.message"?: string;
}

export type UpdateMaintenanceModelSuccess = {
    key: string;
}[];

export type UpdateMaintenanceModelError = {
        code: string,
        key: string
}[];

export type UpdateMaintenanceOperationResponse = {
    successes: UpdateMaintenanceModelSuccess,
    errors: UpdateMaintenanceModelError
}

export type NormalizedErrors = {
    type: "not_found" | "internal",
    key: string,
    message: string
}