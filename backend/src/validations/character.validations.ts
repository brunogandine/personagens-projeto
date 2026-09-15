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
});

export const updateCharacterSchema = z.object({
    anime_id: z.coerce.number().int().positive().optional(),
    name: z.string().trim().min(1, {message: "O nome do personagem é obrigatório."}).max(50, {message: "O nome do personagem pode ter no máximo 50 caractéres."}).optional(),
    description: z.string().trim().max(500).optional(),
    attr_hp: z.coerce.number().int().min(50).optional(),
    attr_atk: z.coerce.number().int().min(5).optional(),
    attr_def: z.coerce.number().int().min(5).optional(),
    currency_lock: formBoolean.optional(),
    active: formBoolean.optional(),
    remove_artwork: formBoolean.optional(),
    remove_thumbnail: formBoolean.optional()
});

export const characterIdSchema = z.object({
    id: z.coerce.number().int().positive(),
});

export type CreateCharacterSchema = z.infer<typeof createCharacterSchema>;
export type UpdateCharacterSchema = z.infer<typeof updateCharacterSchema>;