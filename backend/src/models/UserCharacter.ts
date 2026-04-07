import { prisma } from "../libs/prisma";
import { Prisma } from "@prisma/client";

class UserCharacter {
    create = async (data: Prisma.UserCharactersCreateInput) => {
        return prisma.userCharacters.create({ data });
    }

    getAll = async () => {
        return prisma.userCharacters.findMany();
    }

    getCount = async (userId: number) => {
        return prisma.userCharacters.count({
            where: {user_id: userId}
        });
    }
}

export const userCharacterModel = new UserCharacter()