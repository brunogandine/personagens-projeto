import { RequestHandler } from "express";
import { userSessionModel } from "../models/UserSession";

export const auth: RequestHandler = async (req, res, next) => {
    try {
        const token = req.cookies.session_token;

            if(!token) 
                return res.status(401).json({message: "Acesso negado."});

            const session = await userSessionModel.findByToken(token);

            if(!session || session.expires_at < new Date()) 
                return res.status(401).json({message: "Sessão inválida ou expirada."});

            const user = session.user;

            req.user = user;

            next();
    } catch(err) {
        return res.status(500).json({message: "Erro no servidor."});
    }
}
