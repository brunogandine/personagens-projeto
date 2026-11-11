export type SelectFilterItem<TValue = string | number> = {
    id: string;
    value: TValue | null
};

export type AnimeFilters = SelectFilterItem<number>;
export type RarityFilters = 
    | "NORMAL"
    | "RARE"
    | "SUPER RARE"
    | "SECRET SUPER RARE"
    | "ULTRA RARE"
    | "TRANSCENDENT ULTRA RARE"
    | "LEGENDARY RARE"