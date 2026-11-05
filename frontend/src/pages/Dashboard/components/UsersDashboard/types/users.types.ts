export type UserAction = 
    | "suspend"
    | "edit";

export type EditActions = 
    | "edit"
    | "character_manager"

export type SelectedUserPreview = {
    id: number;
    username: string;
    avatar_url: string | null;
    level: number;
    currency: number;
    active: boolean;
    characters_count: number;
}

export type UserCharacter = {
    id: number;
    character_id: number;
    character_name: string;
    for_hp: number;
    for_atk: number;
    for_def: number;
    level: number;
    exp: number;
    wins_pvp : number;
    wins_npc : number;
    loses_pvp : number;
    loses_npc : number;
    draws_pvp : number;
    draws_npc : number;
}

export type DurationUnit =
    | "hours"
    | "days"
    | "weeks"
    | "months"
    | "years";

export type CustomDuration =
    | {
        mode: "relative"
        value: number;
        unit: DurationUnit;
        expiresAt: Date;
    }
    | {
        mode: "specific";
        expiresAt: Date;
    }

export type UserCharactersFilters = {
    sortBy?: "level" | "attack" | "defense" | "health" | "createdAt" | "updatedAt",
    order?: "asc" | "desc",
    filterBy?: "anime" | "rarity"
};

type SortOption = NonNullable<UserCharactersFilters["sortBy"]>;

export type SortGroup = {
    key: string;
    label: string;
    options: {
        label: string;
        value: SortOption;
    }[];
};