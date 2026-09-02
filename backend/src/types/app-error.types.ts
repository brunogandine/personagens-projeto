export type AppError = 
    | {
        type: "validation";
        errors: { 
            field: string; 
            message: string 
        }[];
    }
    | {
        type: "not_found";
        message: string;
    }
    | {
        type: "storage";
        message?: string; 
        errors?: { message: string }[];
    }
