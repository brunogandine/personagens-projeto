import { CreateAnimeSchema, UpdateAnimeSchema } from "@/validations/anime.validations"

export type GetAnimeParams = {
    page: number,
    search: string
};

export type CreateAnimePayload = {
    data: CreateAnimeSchema
    symbol?:  {
        buffer: Buffer,
        ext: string
    }
};

export type UpdateAnimePayload = {
    id: number
    data: UpdateAnimeSchema
    symbol?: {
        buffer: Buffer,
        ext: string
    }
};

export type UpdateAnimeData = {
    name: string | undefined
    active: boolean | undefined
    description: string | undefined
};

export type DeleteAnimePayload = {
    data: {
        ids: number[];
    }
}

export type RestoreAnimePayload = {
    data: {
        ids: number[];
    }
}