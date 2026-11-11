import type { RarityFilters } from "../components/UserCharacterFiltersModal/types/filter.types";

export const rarityOptions: {
    label: string;
    value: RarityFilters;
}[] = [
    { label: "N", value: "NORMAL" },
    { label: "R", value: "RARE" },
    { label: "SR", value: "SUPER RARE" },
    { label: "SSR", value: "SECRET SUPER RARE" },
    { label: "UR", value: "ULTRA RARE" },
    { label: "TUR", value: "TRANSCENDENT ULTRA RARE" },
    { label: "LR", value: "LEGENDARY RARE" },
];