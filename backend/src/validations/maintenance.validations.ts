import z from "zod";

export const updateMaintenanceSchema = z.object({
    enabled: z.boolean().optional(),
    message: z.string().trim().optional(),
    mod_access: z.boolean().optional()
}).refine(
    (data) =>  data.enabled !== undefined || data.message !== undefined || data.mod_access !== undefined,
        {
            message: `Informe pelo menos uma configuração para atualizar.`,
        }
);

export type UpdateMaintenanceSchema = z.infer<typeof updateMaintenanceSchema>;