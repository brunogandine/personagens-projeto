import { RequestHandler } from "express";

export const authorize = (...roles: string[]): RequestHandler => {
    return (req, res, next) => {
        if(!req.user || !roles.includes(req.user.user_power)) 
            return res.status(403).json({message: "Acesso negado."});
        
        next();
    }
}
