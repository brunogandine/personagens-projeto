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