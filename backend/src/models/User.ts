import { prisma } from "../libs/prisma";
import { Prisma } from "@prisma/client";
import { GetParams } from "../types/user.types";
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

    getModeratorsCount = async () => {
        return prisma.user.count({
            where: {
                user_power: "Moderator"
            }
        });
    }

    getAdminsCount = async () => {
        return prisma.user.count({
            where: {
                user_power: "Admin"
            }
        });
    };

    getRecentUsers = async (limit: number = 5) => {
        return prisma.user.findMany({
                select: {
                    id: true,
                    username: true,
                    avatar_url: true,
                    created_at: true,
                },
                orderBy: {
                    created_at: "desc"
                },
                take: limit
            })
    };

    getUsers = async ({
        page = 1, 
        limit = 50, 
        search = "", 
        sortBy = "created_at", 
        order = "asc"
        }: GetParams) => {

        const where: Prisma.UserWhereInput = search
            ? {
                OR: [{
                    username: { contains: search },
                    email: { contains: search }
                }]
            }
            : {};

        const users = await prisma.user.findMany({
            where,
            select: {
                id: true,
                username: true,
                email: true,
                avatar_url: true,
                active: true,
                currency: true,
                level: true,
            },
            orderBy: {
                [sortBy]: order
            },
            skip: (page - 1) * limit,
            take: limit,
        });

        const total = await prisma.user.count({where});
        const totalPages = Math.ceil(total / limit);
    
        return {
            data: users,
            meta: {
                totalPages
            },
        };
    }
}

export const userModel = new UserModel();