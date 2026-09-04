import { ZodType, ZodError } from "zod";
import { RequestHandler } from "express";

export const validate = (schema: ZodType<any>, source: "body" | "params" | "query"): RequestHandler => (req, res, next) => {
    const result = schema.safeParse(req[source]);

    if(!result.success) {
        const zodError = result.error as ZodError;

        return res.status(400).json({
            message: "Dados inválidos.", 
            errors: zodError.issues.map(issue => ({
                    field: issue.path.join('.'), 
                    message: issue.message
                }))
        });
    }

    req[source] = result.data;

    next(); 
};

