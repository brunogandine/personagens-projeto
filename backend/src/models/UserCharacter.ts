import { prisma } from "../libs/prisma";
import { Prisma } from "@prisma/client";

class UserCharacter {
    create = async (data: Prisma.UserCharactersCreateInput) => {
        return prisma.userCharacters.create({ data });
    }

    getAll = async () => {
        return prisma.userCharacters.findMany();
    }

    getCount = async () => {
        return prisma.userCharacters.count();
    }
}