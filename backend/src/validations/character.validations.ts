import { z } from "zod";

export const createCharacterSchema = z.object({

})

export type CreateCharacterSchema = z.infer<typeof createCharacterSchema>