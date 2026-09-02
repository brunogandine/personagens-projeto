import { z } from "zod";

export const createAnimeSchema = z.object({

})

export type CreateAnimeSchema = z.infer<typeof createAnimeSchema>