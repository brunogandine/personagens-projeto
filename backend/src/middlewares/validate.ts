import { ZodType, ZodError } from "zod";
import { RequestHandler } from "express";

const validate = (schema: ZodType<any>, source: "body" | "params" | "query"): RequestHandler => (req, res, next) => {
    const data = source === "query"
        ? {
            ...req.query,
            ...(res.locals.filterBy !== undefined && { filterBy: res.locals.filterBy })
        }
        : req[source];

    const result = schema.safeParse(data);

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

    if(source === "query") {
        res.locals.validatedQuery = result.data;
    } else {
        req[source] = result.data;
    };

    next(); 
};

export default validate;

