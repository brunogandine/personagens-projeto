import { prisma } from "../libs/prisma";
import { Prisma } from "@prisma/client";

class UserSessionModel {
    create = async (data: Prisma.UserSessionCreateInput) => {
        return prisma.userSession.create({ data })
    }

    delete = async (id: number) => {
        return prisma.userSession.delete({
            where: { id }
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
            include: { user: true}
        })
    }
}

export const userSessionModel = new UserSessionModel();