import { z } from "zod";

export const changePasswordSchema = z.object({
    currentPassword: z
        .string()
        .min(1, {message: `É preciso informar a senha atual.`}),

    newPassword: z
        .string()
        .min(1, {message: `É preciso informar a nova senha.`})
        .min(6, {message: `A nova senha precisa ter no mínimo 6 caractéres.`}),

    confirmNewPassword: z
        .string()
        .min(1, {message: `É preciso confirmar a nova senha.`})
}).superRefine((data, ctx) => {
    if(data.newPassword !== data.confirmNewPassword) {
        ctx.addIssue({
            code: "custom",
            path: ['confirmNewPassword'],
            message: `As senhas não coincidem.`
        });
    };

    if(data.currentPassword === data.newPassword) {
        ctx.addIssue({
            code: "custom",
            path: ['newPassword'],
            message: `A nova senha precisa ser diferente da senha atual.`
        })
    }
})

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;