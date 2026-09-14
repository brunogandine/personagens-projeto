import { prisma } from "../libs/prisma";
import { Prisma } from "@prisma/client";
import type { EditCharacterData, GetCharactersParams } from "../types/character.types";
import type { CreateCharacterSchema, UpdateCharacterSchema } from "@/validations/character.validations";


class CharacterModel {
    create = async (data: CreateCharacterSchema) => {
        return prisma.character.create({
            data
        });
    }

    update = async (id: number, data: EditCharacterData) => {
        const normalizeData = Object.fromEntries(
            Object.entries(data).filter(([, value]) => value !== undefined)
        );

        return prisma.character.update({
            where: { id },
            data: normalizeData
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