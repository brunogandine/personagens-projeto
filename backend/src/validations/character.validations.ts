import { z } from "zod";

const formBoolean = z
    .enum(["true", "false"])
    .transform((value) => value === "true");

export const createCharacterSchema = z.object({
    anime_id: z.coerce.number().int().positive(),
    name: z.string().trim().min(1, {message: "O nome do personagem é obrigatório."}).max(50, {message: "O nome do personagem pode ter no máximo 50 caractéres."}),
    description: z.string().trim().max(500),
    attr_hp: z.coerce.number().int().min(50),
    attr_atk: z.coerce.number().int().min(5),
    attr_def: z.coerce.number().int().min(5),
    currency_lock: formBoolean,
    active: formBoolean
})

export type CreateCharacterSchema = z.infer<typeof createCharacterSchema>