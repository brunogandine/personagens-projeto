import { custom, z } from "zod";

export const registerSchema = z.object({
    username: z.string().min(1, {message: "O nome de usuário não pode estar vazio."}).pipe(z.string().min(5, {message: "O nome de usuário precisa ter no mínimo 5 caracteres"}).max(18, {message: "O nome de usuário pode ter no máximo 18 caracteres"})),
    email: z.string().email({message: "Email inválido"}),
    user_key: z.string().min(1, {message: "É preciso criar uma senha."}).pipe(z.string().min(6, {message: "A senha precisa ter no mínimo 6 caracteres"})),
    confirmPassword: z.string().min(1, {message: "É preciso confirmar a senha."})
}).superRefine((data, ctx) => {
    if(!data.confirmPassword) return;
    
    if(data.user_key !== data.confirmPassword)
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "As senhas não coincidem.",
            path: ["confirmPassword"]
        });
});

export const loginSchema = z.object({
    email: z.string().email({message: "Email inválido"}),
    user_key: z.string()
})


export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;