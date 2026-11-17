import { prisma } from "../libs/prisma";
import { Prisma } from "@prisma/client";
import { GetUserCharactersParams } from "@/types/user.types";

class UserCharacter {
    create = async (data: Prisma.UserCharactersCreateInput) => {
        return prisma.userCharacters.create({ data });
    };

    findUserCharactersById = async ({id, page = 1, search = "", sortBy, orderBy, filterBy}: GetUserCharactersParams) => {
        const PER_PAGE = 6;

        const where: Prisma.UserCharactersWhereInput = {
            user_id: id,
            character: {
                ...(search && {
                    name: {
                        contains: search
                    }
                }),
                ...(filterBy?.anime_id?.length && {
                    anime_id: {
                        in: filterBy.anime_id
                    }
                }),
                ...(filterBy?.rarity?.length && {
                    rarity: {
                        in: filterBy.rarity
                    }
                })
            }
        };

        const orderByQuery: Prisma.UserCharactersOrderByWithRelationInput = sortBy
            ? { [sortBy]: orderBy ?? "asc" }
            : { id: orderBy ?? "asc" }

        const characters = await prisma.userCharacters.findMany({
            where,
            skip: (page - 1) * PER_PAGE,
            take: PER_PAGE,
            orderBy: orderByQuery,
            include: {
                character: {
                    select: {
                        name: true,
                        rarity: true
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