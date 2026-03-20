import { prisma } from "../libs/prisma";
import { Prisma } from "@prisma/client";

class UserSessionModel {
    create = async (data: Prisma.UserSessionCreateInput) => {
        return prisma.userSession.create({ data })
    }

    delete = async (session_token: string) => {
        return prisma.userSession.delete({
            where: { session_token }
        })
    }

    update = async (id: number, data: Prisma.UserSessionUpdateInput) => {
        return prisma.userSession.update({
            where: { id },
            data
        })
    }

    findByToken = async (token: string) => {
        return prisma.userSession.findUnique({
            where: {session_token: token},
            include: {user: {
                select: {
                    id: true,
                    email: true,
                    username: true,
                    currency: true,
                    level: true,
                    user_power: true,
                    avatar_url: true
                }
            }}
        })
    }
}

export const userSessionModel = new UserSessionModel();