import type { AnimeItem } from "@/types/Animes.types";
import type { RarityFilters } from "../components/UserCharacterFiltersModal/types/filter.types";

export const rarityOptions: {
    label: string;
    value: RarityFilters;
}[] = [
    { label: "N", value: "NORMAL" },
    { label: "R", value: "RARE" },
    { label: "SR", value: "SUPER_RARE" },
    { label: "SSR", value: "SUPER_SECRET_RARE" },
    { label: "UR", value: "ULTRA_RARE" },
    { label: "TUR", value: "TRANSCENDENT_ULTRA_RARE" },
    { label: "LR", value: "LEGENDARY_RARE" },
];

export const getAnimeOptions = (list: AnimeItem[]) => {
    return list.map((anime) => ({
        label: anime.name,
        value: anime.id
    }));
}