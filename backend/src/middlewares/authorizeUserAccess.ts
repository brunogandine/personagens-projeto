import { RequestHandler } from "express";

const authorizeUserAccess: RequestHandler = (req, res, next) => {
    const requestedUserId = Number(req.params.id);
    const authenticatedUserId = req.user

    if(!authenticatedUserId)
        return res.status(401).json({message: "Não autenticado."});

    const canAccess = ["Admin", "Moderator"].includes(authenticatedUserId.user_power);
    const isOwner = authenticatedUserId.id === requestedUserId;

    if(!canAccess && !isOwner)
        return res.status(403).json({message: "Acesso Negado!"});

    next();
};

export default authorizeUserAccess;