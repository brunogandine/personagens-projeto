import { CreateAnimeSchema } from "@/validations/anime.validations"

export type GetAnimeParams = {
    page: number,
    search: string
}

export type CreateAnimeData = {
    data: CreateAnimeSchema
    symbol?:  {
        buffer: Buffer,
        ext: string
    }
}