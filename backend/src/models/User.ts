import { prisma } from "../libs/prisma";
import { Prisma } from "@prisma/client";

class UserModel {
    create = async (data: Prisma.UserCreateInput) => {
        return prisma.user.create({ data })
    }

    update = async (id: number, data: Prisma.UserUpdateInput) => {
        return prisma.user.update({
            where: { id },
            data
        })
    }

    updateAvatar = async(id: number, avatarUrl: string | null) => {
        return prisma.user.update({
            where: { id },
            data: {
                avatar_url: avatarUrl
            }
        });
    }

    findById = async (id: number) => {
        return prisma.user.findUnique({ 
            where: { id },
            select: {
                id: true,
                username: true,
                email: true,
                avatar_url: true,
                user_key: true
            }
        })
    }

    findByEmail = async (email: string) => {
        return prisma.user.findUnique({ where: { email } })
    }

    findByUsername = async (username: string) => {
        return prisma.user.findUnique({ where: { username } })
    }

    getUserCount = async () => {
        return prisma.user.count();
    }
}

export const userModel = new UserModel();