import { AppError } from "@/types/app-error.types";

export const isAppError = (err: unknown): err is AppError => {
    return (
        typeof err === "object" &&
        err !== null &&
        "type" in err
    );
};