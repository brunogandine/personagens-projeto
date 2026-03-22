import { RequestHandler } from "express";
import UserService from "../services/user.service";
import { fileTypeFromBuffer } from "file-type";
import { validMimeTypes } from "../middlewares/upload-avatar";
import userService from "../services/user.service";

class UserController {
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

            const detectType = await fileTypeFromBuffer(req.file.buffer);

            if(!detectType || !validMimeTypes.includes(detectType.mime))
                return res.status(400).json({
                    message: `Tipo do Arquivo inválido.`
                });

            const updatedUser = await UserService.updateAvatar({
                userId,
                buffer: req.file.buffer,
                extension: detectType.ext,
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

            const recents = await userService.getRecentAvatars(userId);

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