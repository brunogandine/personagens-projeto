import { prisma } from "../libs/prisma";
import { Prisma } from "@prisma/client";
import { GetUserCharactersParams } from "@/types/user.types";

class UserCharacter {
    create = async (data: Prisma.UserCharactersCreateInput) => {
        return prisma.userCharacters.create({ data });
    };

    findUserCharactersById = async ({id, page = 1, search = ""}: GetUserCharactersParams) => {
        const PER_PAGE = 6;

        const where: Prisma.UserCharactersWhereInput = {
            user_id: id,
            ...(search && {
                character: {
                    name: {
                        contains: search
                    }
                }
            })
        };

        const characters = await prisma.userCharacters.findMany({
            where,
            skip: (page - 1) * PER_PAGE,
            take: PER_PAGE,
            orderBy: {
                id: "asc"
            },
            include: {
                character: {
                    select: {
                        name: true
                    }
                }
            }
        });

        const total = await prisma.userCharacters.count({
            where
        });
        
        const totalPages = Math.ceil(total / PER_PAGE);

        return {
            data: characters,
            meta: {
                totalPages
            }
        };
    };

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