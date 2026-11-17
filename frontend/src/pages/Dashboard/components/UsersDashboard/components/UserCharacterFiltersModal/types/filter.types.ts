export type SelectFilterItem<TValue = string | number> = {
    id: string;
    value: TValue | null
};

export type AnimeFilters = SelectFilterItem<number>;
export type RarityFilters = 
    | "NORMAL"
    | "RARE"
    | "SUPER_RARE"
    | "SUPER_SECRET_RARE"
    | "ULTRA_RARE"
    | "TRANSCENDENT_ULTRA_RARE"
    | "LEGENDARY_RARE"