import { prisma } from "../libs/prisma";
import { Prisma } from "@prisma/client";
import { GetAnimeParams } from "../types/anime.types";
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

    findById = async (id: number) => {
        return prisma.anime.findUnique({
            where: { id }
        });
    }

    findByName = async (name: string) => {
        return prisma.anime.findFirst({
            where: {
                name
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