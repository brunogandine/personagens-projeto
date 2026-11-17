import z from "zod";

const queryArray = <T extends z.ZodType>(schema: T) => 
    z.preprocess(
        (value) => {
            if(value === undefined)
                return undefined;

            return Array.isArray(value) ? value : [value];
        },
        z.array(schema).optional()
    );

export const userCharactersQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    search: z.string().default(""),
    sortBy: z.enum(["level", "for_atk", "for_def", "for_hp", "created_at", "updated_at"]).optional(),
    orderBy: z.enum(["asc", "desc"]).optional(),
    filterBy: z.object({
        anime_id: queryArray(z.coerce.number().int().positive()),
        rarity: queryArray(z.enum([
            "NORMAL",
            "RARE",
            "SUPER_RARE",
            "SUPER_SECRET_RARE",
            "ULTRA_RARE",
            "TRANSCENDENT_ULTRA_RARE",
            "LEGENDARY_RARE"
        ]))
    }).optional()
}).strict();

export type UserCharacterQuerySchema = z.infer<typeof userCharactersQuerySchema>;