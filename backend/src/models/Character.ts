import { prisma } from "../libs/prisma";
import { Prisma } from "@prisma/client";
import { CreateCharacterData, GetCharactersParams } from "../types/character.types";


class CharacterModel {
    create = async (data: CreateCharacterData) => {
        return prisma.character.create({ 
            data: {
                anime_id: data.anime_id,
                currency_lock: data.currency_lock ?? false,
                active: data.active ?? false,
                attr_hp: data.attr_hp,
                attr_atk: data.attr_atk,
                attr_def: data.attr_def,
                description: {
                    create: {
                        name: data.name,
                        description: data.description
                    }
                }
            } });
    }

    update = async (id: number, data: Prisma.CharacterUpdateInput) => {
        return prisma.character.update({
            where: { id },
            data
        });
    }

    delete = async (id: number) => {
        return prisma.character.delete({
            where: { id }
        });
    }

    findById = async (id: number) => {
        return prisma.character.findUnique({
            where: { id }
        });
    }

    getCharacters = async ({
        page = 1,
        search = "",
    }: GetCharactersParams) => {
        const PER_PAGE = 15;

        const where: Prisma.CharacterWhereInput = search 
        ? {
            description: {
                some: {
                    name: { contains: search }
                }
            }
        }
        : {};
        const characters = await prisma.character.findMany({
            include: {
                description: {
                    select: {
                        name: true,
                        description: true,
                    }
                }
            },
            where,
            skip: (page - 1) * PER_PAGE,
            take: PER_PAGE,
            orderBy: {
                id: "asc"
            }
        });

        const total = await prisma.character.count({ 
            where 
        });
        const totalPages = Math.ceil(total / PER_PAGE);

        return {
            data: characters,
            meta: {
                totalPages
            }
        }
    }

    getCount = async () => {
        return prisma.character.count();
    }
}

export const characterModel = new CharacterModel();