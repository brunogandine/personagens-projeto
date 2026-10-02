import { prisma } from "../libs/prisma";
import { Prisma } from "@prisma/client";
import { AnimeListFilters, UpdateAnimeData } from "@/types/anime.types";
import { CreateAnimeSchema } from "@/validations/anime.validations";

type FindManyAnimeParams = {
    filters?: AnimeListFilters;
    orderBy: Prisma.AnimeOrderByWithRelationInput;
    pagination?: {
        page: number;
        perPage: number;
    }
}
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
        });
    };

    findMany = async ({filters, orderBy, pagination}: FindManyAnimeParams) => {
        const where = this.buildWhere(filters);

        return prisma.anime.findMany({
            where,
            orderBy,
            ...(pagination && {
                skip: (pagination.page - 1) * pagination.perPage,
                take: pagination.perPage
            })
        });
    };

    count = async () => {
        return prisma.anime.count();
    };

    private buildWhere(filters?: AnimeListFilters): Prisma.AnimeWhereInput {

        const where: Prisma.AnimeWhereInput = {};

        if(filters?.search) {
            where.name = {
                contains: filters.search
            };
        };

        if(filters?.status === "active") {
            where.active = true;
            where.deleted_at = null;
        };

        if(filters?.status === "inactive") {
            where.active = false;
            where.deleted_at = null;
        };

        if(filters?.deleted === "deleted") {
            where.deleted_at = {
                not: null
            };
        };

        if(filters?.deleted === "not_deleted") {
            where.deleted_at = null;
        }

        return where;
    };
}

export const animeModel = new AnimeModel();