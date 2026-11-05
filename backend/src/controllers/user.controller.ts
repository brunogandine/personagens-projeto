import UserService from "@/services/user.service";
import { RequestHandler } from "express";
import { detectImageType } from "@/utils/detectImageType";

class UserController {
    getUsers: RequestHandler = async (req, res) => {
        try {
            const { page, limit, search, sortBy, order } = req.query;

            const result = await UserService.getUsers({
                page: Number(page),
                limit: Number(limit),
                search: search as string,
                sortBy: sortBy as string,
                order: order as "asc" | "desc"
            });

            return res.json(result);
        } catch(err) {
            return res.status(500).json({message: "Erro Interno."});
        };
    };

    getUserCharacters: RequestHandler = async (req, res) => {
        try {
            const { page, search } = req.query;

            const result = await UserService.getUserCharacters({id: Number(req.params.id), page: Number(page ?? 1), search: search as string});

            return res.json(result);
        } catch(err) {
            return res.status(500).json({message: "Erro Interno"});
        };
    };

    getCounts: RequestHandler = async (req, res) => {
        try {
            const count = await UserService.getUsersCount();

            return res.status(200).json({count});
        } catch(err) {
            return res.status(500).json({message: "Erro Interno."})
        }
    };

    updateAvatar: RequestHandler = async (req, res) => {
        try {
            const userId = req.user?.id;
            const source = req.body.source;

            if(!userId)
                return res.status(401).json({
                    message: `Usuário não autenticado.`
                });

            if(source !== "upload" && source !== "recent") 
                return res.status(400).json({
                    message: `Origem de avatar inválida.`
                });

            if(!req.file)
                return res.status(400).json({
                    message: `Nenhuma imagem enviada.`
                });

            const detectType = await detectImageType(req.file.buffer);

            if(!detectType)
                return res.status(400).json({
                    message: `Tipo do Arquivo inválido.`
                });

            const updatedUser = await UserService.updateAvatar({
                userId,
                buffer: req.file.buffer,
                extension: detectType,
                source: req.body.source,
            });

            return res.status(200).json({
                message: `Avatar atualizado com sucesso.`,
                avatarUrl: updatedUser.avatar_url,
                user: updatedUser
            });
        } catch(err) {
            console.error(err);

            return res.status(500).json({
                message: `Erro interno ao atualizar avatar.`
            });
        };
    };

    getRecentAvatars: RequestHandler = async (req, res) => {
        try {
            const userId = req.user?.id;

            if(!userId) 
                return res.status(401).json({
                    message: `Usuário não autenticado.`
                });

            const recents = await UserService.getRecentAvatars(userId);

            return res.json(recents);
        } catch(err) {
            return res.status(500).json({
                message: `Erro interno ao buscar avatares recentes.`
            })
        }
    };

    changePassword: RequestHandler = async (req, res) => {
        try {
            const userId = req.user?.id;

            if(!userId)
                return res.status(401).json({
                    message: `Usuário não autenticado.`
                });

            const { currentPassword, newPassword } = req.body;

            const result = await UserService.changePassword({
                userId,
                currentPassword,
                newPassword
            });

            return res.status(201).json(result.message)
        } catch(err: any) {
            if(err.type === "validation") {
                return res.status(400).json({ message: `Erro de validação`, errors: err.errors })
            };

            return res.status(400).json({ message: `Erro desconhecido.` })
        }
    }
}

export default new UserController();