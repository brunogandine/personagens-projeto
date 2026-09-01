export type AppError = 
    | {
        type: "validation";
        errors: { field: string; 
        message: string }[];
    }
    | {
        type: "not_found";
        message: string;
    }
