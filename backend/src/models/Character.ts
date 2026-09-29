import { prisma } from "../libs/prisma";
import { Prisma } from "@prisma/client";
import type { UpdateCharacterData, GetCharactersParams } from "../types/character.types";
import type { CreateCharacterSchema } from "@/validations/character.validations";


class CharacterModel {
    create = async (data: CreateCharacterSchema) => {
        return prisma.character.create({
            data
        });
    }

    update = async (id: number, data: UpdateCharacterData) => {
        const normalizeData = Object.fromEntries(
            Object.entries(data).filter(([, value]) => value !== undefined)
        );

        return prisma.character.update({
            where: { id },
            data: normalizeData
        });
    };

    softDelete = async (ids: number[]) => {
        return prisma.character.updateMany({
            where: {
                id: {
                    in: ids
                }
            },
            data: {
                deleted_at: new Date()
            }
        });
    };

    restore = async (ids: number[]) => {
        return prisma.character.updateMany({
            where: {
                id: {
                    in: ids
                }
            },
            data: {
                deleted_at: null
            }
        });
    };

    delete = async (id: number) => {
        return prisma.character.delete({
            where: { id }
        });
    };

    findById = async (id: number) => {
        return prisma.character.findUnique({
            where: { id },
            include: {
                anime: true
            }
        });
    };

    findManyByIds = async (ids: number[]) => {
        return prisma.character.findMany({
            where: { 
                id: {
                    in: ids
                }
            },
            select: {
                id: true,
                deleted_at: true
            }
        });
    };

    getCharacters = async ({
        page = 1,
        search = "",
    }: GetCharactersParams) => {
        const PER_PAGE = 19;

        const where: Prisma.CharacterWhereInput = search 
        ? {
            name: { contains: search }
        }
        : {};
        const characters = await prisma.character.findMany({
            where,
            skip: (page - 1) * PER_PAGE,
            take: PER_PAGE,
            orderBy: {
                id: "asc"
            },
            select: {
                id: true,
                anime_id: true,
                name: true,
                active: true,
                deleted_at: true,
                anime: {
                    select: {
                        deleted_at: true
                    }
                }
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