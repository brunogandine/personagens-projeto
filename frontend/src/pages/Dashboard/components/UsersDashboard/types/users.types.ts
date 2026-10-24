export type UserAction = 
    | "suspend"
    | "edit";

export type EditActions = 
    | "edit"
    | "character_manager"

export type SelectedUserPreview = {
    id: number;
    username: string;
    avatar_url: string | null;
    level: number;
    currency: number;
    active: boolean;
}

export type DurationUnit =
    | "hours"
    | "days"
    | "weeks"
    | "months"
    | "years";

export type CustomDuration =
    | {
        mode: "relative"
        value: number;
        unit: DurationUnit;
        expiresAt: Date;
    }
    | {
        mode: "specific";
        expiresAt: Date;
    }