export type GetParams = {
    page?: number,
    limit?: number,
    search?: string, 
    sortBy?: string, 
    order?: "asc" | "desc"
};

export type UserCharactersFilters = {
    sortBy?: "level" | "for_atk" | "for_def" | "for_hp" | "createdAt" | "updatedAt" | undefined,
    orderBy?: "asc" | "desc" | undefined,
    filterBy?: {
        anime_id?: number[] | undefined;
        rarity?: RarityFilters[] | undefined;
    } | undefined;
};

export type RarityFilters = 
    | "NORMAL"
    | "RARE"
    | "SUPER_RARE"
    | "SUPER_SECRET_RARE"
    | "ULTRA_RARE"
    | "TRANSCENDENT_ULTRA_RARE"
    | "LEGENDARY_RARE"

export type GetUserCharactersParams = {
    id: number,
    page?: number,
    search?: string
} & UserCharactersFilters;