import path from "path";
import fs from "fs";
import crypto from "crypto";
import { hashPassword, comparePassword } from "../utils/bcrypt.util";
import { userModel } from "../models/User";

const uploadDir = path.resolve(process.cwd(), "uploads", "avatars");

class UserService {
    async getUsersCount() {
        return userModel.getUserCount();
    }

    async updateAvatar({ userId, buffer, extension, source }: { userId: number, buffer: Buffer, extension: string, source: "upload" | "recent" }) {
        const user = await userModel.findById(userId);

        if(!user)
            throw new Error(`Usuário não encontrado.`);

        const userPath = path.join(uploadDir, user.id.toString())

        const fileName = `${crypto.randomUUID()}.${extension}`;
        const userFilePath = path.join(userPath, fileName);
        const recentFilesPath = path.join(userPath, "recents");

        const avatarUrl = `uploads/avatars/${userId}/${fileName}`;

        await fs.promises.mkdir(userPath, {recursive: true})

        try {
            await fs.promises.writeFile(userFilePath, buffer);

            if(source === "upload") {
                await this.copyToRecents({userPath, fileName, buffer});
            };

            const updatedUser = await userModel.updateAvatar(userId, avatarUrl);

            if(user.avatar_url) {
                const activeFileName = path.basename(user.avatar_url);

                await fs.promises.unlink(path.join(userPath, activeFileName)).catch((err) => {
                    console.warn(`Falha ao remover arquivo de imagem: `, err);
                });
            };

            if(source === "upload") {
                await this.enforceRecentLimit(recentFilesPath).catch((err) => {
                    console.warn(`Falha ao aplicar limite em Recents: `, err);
                });
            };

            return updatedUser;
        }catch(err) {
            console.error(`Falha no fluxo de updateAvatar: `, err)

            await fs.promises.unlink(userFilePath).catch(() => {});

            if(source === "upload") {
                await fs.promises.unlink(path.join(recentFilesPath, fileName)).catch(() => {})
            }

            throw new Error(`Erro ao atualizar avatar.`);
        }
    };

    private async copyToRecents({userPath, fileName, buffer }: {userPath: string, fileName: string, buffer: Buffer}) {
        const target = path.resolve(userPath, 'recents', fileName);

        await fs.promises.mkdir(path.dirname(target), { recursive: true });
        await fs.promises.writeFile(target, buffer);
    };

    private getRecentsDir(userId: number) {
        return path.resolve(process.cwd(), "uploads", "avatars", String(userId), "recents");
    }

    private async ensureRecentDir(userId: number) {
        const recentDir = this.getRecentsDir(userId)
        await fs.promises.mkdir(recentDir, { recursive: true });
    }

    async getRecentAvatars(userId: number) {
        const recentDir = this.getRecentsDir(userId);

        await this.ensureRecentDir(userId);

        const files = await fs.promises.readdir(recentDir);

        const detailedFiles = await Promise.all(
            files.map(async (file) => {
                const fullPath = path.join(recentDir, file);
                const stats = await fs.promises.stat(fullPath);

                if(!stats.isFile()) 
                    return null;

                return {
                    fileName: file,
                    avatarPath: `uploads/avatars/${userId}/recents/${file}`,
                    updatedAt: stats.mtime
                };
            })
        );

        return detailedFiles
            .filter((file): file is NonNullable<typeof file> => file !== null)
            .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    }

    private async enforceRecentLimit(recentFilesPath: string) {
        const files = await fs.promises.readdir(recentFilesPath);

        const detailedFiles = await Promise.all(
            files.map(async (file) => {
                const fullPath = path.join(recentFilesPath, file);
                const stats = await fs.promises.stat(fullPath);

                if(!stats.isFile())
                    return null;

                return {
                    file,
                    fullPath,
                    updatedAt: stats.mtime
                };
            })
        );

        const sortedFiles = detailedFiles
            .filter((file): file is NonNullable<typeof file> => file !== null)
            .sort(
                (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
            );

        const filesToDelete = sortedFiles.slice(6);

        await Promise.all(
            filesToDelete.map(file =>
                fs.promises.unlink(file.fullPath).catch(() => {})
            )
        );
    }

    async changePassword({ userId, currentPassword, newPassword }: { userId: number, currentPassword: string, newPassword: string}) {
        const user = await userModel.findById(userId);
        const errors = [];

        if(!user)
            throw new Error(`Usuário não encontrado.`);

        const isPasswordCorrect = await comparePassword(
            currentPassword, 
            user.user_key
        );

        if(!isPasswordCorrect)
            errors.push({ field: "currentPassword", message: `Senha atual inválida.`})

        if(errors.length > 0)
            throw { type: "validation", errors };

        const hashedPassword = await hashPassword(newPassword);

        await userModel.update(
            userId, 
            { user_key: hashedPassword }
        );

        return {
            message: `Senha alterada com sucesso.`
        };
    }
}

export default new UserService();