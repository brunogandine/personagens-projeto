import { z } from "zod"

export const formBoolean = z
    .enum(["true", "false"], {message: "É preciso enviar um valor booleano válido."})
    .transform((value) => value === "true");

export const idParamsSchema = z.object({
    id: z.coerce.number().int().positive(),
});