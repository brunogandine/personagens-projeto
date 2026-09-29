import { prisma } from "../libs/prisma";
import { Prisma } from "@prisma/client";

class CharacterModel {
    create = async (data: Prisma.CharacterCreateInput) => {
        return prisma.character.create({ data });
    }

    update = async (id: number, data: Prisma.CharacterUpdateInput) => {
        return prisma.character.update({
            where: { id },
            data
        });
    }

    delete = async (id: number) => {
        return prisma.character.delete({where: { id }});
    }

    findById = async (id: number) => {
        return prisma.character.findUnique({where: { id }});
    }

    getAll = async () => {
        return prisma.character.findMany();
    }

    getCount = async () => {
        return prisma.character.count();
    }
}

export const characterModel = new CharacterModel();