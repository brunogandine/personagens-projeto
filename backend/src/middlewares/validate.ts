import { ZodType, ZodError } from "zod";
import { RequestHandler } from "express";

export const validate = (schema: ZodType<any>): RequestHandler => (req, res, next) => {
    const result = schema.safeParse(req.body);

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

    req.body = result.data;

    next(); 
};

