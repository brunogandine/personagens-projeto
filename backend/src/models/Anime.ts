import { prisma } from "../libs/prisma";
import { Prisma } from "@prisma/client";
import { CreateAnimeData, GetAnimeParams } from "../types/anime.types";

class AnimeModel {
    create = async (data: CreateAnimeData) => {
        return prisma.anime.create({
            data: {
                active: data.active,
                description: {
                    create: {
                        name: data.name,
                        description: data.description
                    }
                }
            }
        })
    }

    findById = async (id: number) => {
        return prisma.anime.findUnique({
            where: { id }
        });
    }

    findByName = async (name: string) => {
        return prisma.anime.findFirst({
            where: {
                description: {
                    some: {
                        name: { equals: name}
                    }
                }
            }
        })
    }

    getAnimes = async ({
        page = 1,
        search = ""
    }: GetAnimeParams) => {
        const PER_PAGE = 6;

        const where: Prisma.AnimeWhereInput = search
            ? {
                description: {
                    some: {
                        name: {contains: search}
                    }
                }
            }
            : {}

        const animes = await prisma.anime.findMany({
            include: {
                description: {
                    select: {
                        name: true,
                    }
                }
            },
            where,
            skip: (page - 1) * PER_PAGE,
            take: PER_PAGE,
            orderBy: {
                id: "asc"
            }
        })

        const total = await prisma.anime.count({
            where
        });
        const totalPages = Math.ceil(total / PER_PAGE);

        return {
            animes,
            meta: {
                totalPages
            }
        }
    }

    getCount = async () => {
        return prisma.anime.count();
    }
}

export const animeModel = new AnimeModel();