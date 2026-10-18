import { z } from "zod";
import { formBoolean } from "./common/common.validations";

export const GetAnimesQuerySchema = z.object({
    status: z.enum(["active", "inactive"], {message: "Filtro inválido para o campo 'status'."}).optional(),
    deleted: z.enum(["deleted", "not_deleted"], {message: "Filtro inválido para o campo 'deleted'."}).optional(),
    search: z.string().trim().optional(),
    page: z.coerce.number().int().min(1, {message: "A página deve ser um número positivo."}).positive().optional(),
    perPage: z.coerce
        .number()
        .int()
        .min(1, {message: "O número de itens por página deve ser um número positivo."})
        .max(50, {message: "O número de itens por página não pode exceder 50."})
        .positive()
        .optional()
})

export const createAnimeSchema = z.object({
    name: z.string({message: "É preciso enviar um nome válido. Deve ser um texto."}).trim().min(1, {message: "O nome do anime é obrigatório."}).max(50, {message: "O nome do anime pode ter no máximo 50 caracteres."}),
    description: z.string({message: "É preciso enviar uma descrição válida. Deve ser um texto."}).trim().max(500).optional(),
    active: formBoolean
});

export const updateAnimeSchema = z.object({
    name: z.string({message: "É preciso enviar um nome válido. Deve ser um texto."}).trim().min(1, {message: "O nome do anime é obrigatório."}).max(50, {message: "O nome do anime pode ter no máximo 50 caractéres."}).optional(),
    active: formBoolean.optional(),
    description: z.string({message: "É preciso enviar uma descrição válida. Deve ser um texto."}).trim().max(500).optional(),
    remove_symbol: formBoolean.optional()
});

export const deleteAnimeSchema = z.object({
    ids: z.array(z.number().int()).min(1, {message: "É preciso selecionar pelo menos um anime para executar está ação."}).max(5, {message: "Não é possível excluir mais do que 5 animes ao mesmo tempo."}).refine((ids) => new Set(ids).size === ids.length, {message: "Não é permitido informar IDs duplicados."}), 
    confirmationText: z.literal("DELETAR ANIME", {error: "Texto de confirmação inválido."})
});

export const restoreAnimeSchema = z.object({
    ids: z.array(z.number().int()).min(1, {message: "É preciso selecionar pelo menos um anime para executar está ação."}).max(5, {message: "Não é possível restaurar mais do que 5 animes ao mesmo tempo."}).refine((ids) => new Set(ids).size === ids.length, {message: "Não é permitido informar IDs duplicados."})
})

export type GetAnimesQuerySchema = z.infer<typeof GetAnimesQuerySchema>;
export type CreateAnimeSchema = z.infer<typeof createAnimeSchema>
export type UpdateAnimeSchema = z.infer<typeof updateAnimeSchema>;