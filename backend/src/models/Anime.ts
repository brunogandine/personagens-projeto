import { prisma } from "../libs/prisma";
import { Prisma } from "@prisma/client";
import { GetAnimeParams, UpdateAnimeData } from "@/types/anime.types";
import { CreateAnimeSchema } from "@/validations/anime.validations";

class AnimeModel {
    create = async (data: CreateAnimeSchema) => {
        return prisma.anime.create({
            data: {
                active: data.active,
                name: data.name,
                description: data.description ?? null
            }
        })
    }

    update = async (id: number, data: UpdateAnimeData) => {
        const normalizeData = Object.fromEntries(
            Object.entries(data).filter(([, value]) => value !== undefined)
        );

        return prisma.anime.update({
            where: { id },
            data: normalizeData
        });
    };

    softDelete = async (ids: number[]) => {
        return prisma.anime.updateMany({
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
        return prisma.anime.updateMany({
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

    findById = async (id: number) => {
        return prisma.anime.findUnique({
            where: { id }
        });
    };

    findManyByIds = async (ids: number[]) => {
        return prisma.anime.findMany({
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

    findByName = async (name: string) => {
        return prisma.anime.findFirst({
            where: {
                name
            }
        })
    };

    getAnimes = async ({
        page = 1,
        search = ""
    }: GetAnimeParams) => {
        const PER_PAGE = 6;

        const where: Prisma.AnimeWhereInput = search
            ? {
                name: {
                    contains: search
                }
            }
            : {}

        const animes = await prisma.anime.findMany({
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
            data: animes,
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