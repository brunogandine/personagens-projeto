import { z } from "zod";
import { formBoolean } from "./common/common.validations";

export const createAnimeSchema = z.object({
    name: z.string({message: "É preciso enviar um nome válido. Deve ser um texto."}).trim().min(1, {message: "O nome do anime é obrigatório."}).max(50, {message: "O nome do anime pode ter no máximo 50 caracteres."}),
    description: z.string({message: "É preciso enviar uma descrição válida. Deve ser um texto."}).trim().max(500).optional(),
    active: formBoolean
})

export const updateAnimeSchema = z.object({
    name: z.string({message: "É preciso enviar um nome válido. Deve ser um texto."}).trim().min(1, {message: "O nome do anime é obrigatório."}).max(50, {message: "O nome do anime pode ter no máximo 50 caractéres."}).optional(),
    active: formBoolean.optional(),
    description: z.string({message: "É preciso enviar uma descrição válida. Deve ser um texto."}).trim().max(500).optional(),
    remove_symbol: formBoolean.optional()
})

export type CreateAnimeSchema = z.infer<typeof createAnimeSchema>
export type UpdateAnimeSchema = z.infer<typeof updateAnimeSchema>;