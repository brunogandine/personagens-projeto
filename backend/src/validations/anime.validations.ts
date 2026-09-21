import { z } from "zod";
import { formBoolean } from "./common/common.validations";

export const createAnimeSchema = z.object({
    name: z.string().trim().min(1, {message: "O nome do anime é obrigatório."}).max(50, {message: "O nome do anime pode ter no máximo 50 caracteres."}),
    description: z.string().trim().max(500),
    active: formBoolean
})

export type CreateAnimeSchema = z.infer<typeof createAnimeSchema>