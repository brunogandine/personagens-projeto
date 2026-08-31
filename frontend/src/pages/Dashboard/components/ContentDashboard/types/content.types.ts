export type CharacterItem = {
    id: number;
    anime_id: number;
    name: string;
    active: boolean;
}

export type AnimeItem = {
    id: number;
    name: string;
    active: boolean;
}

export type AnimeItemViewModel = {
    id: number;
    name: string;
    active: boolean;
    image: string;
}

export type CharacterItemViewModel = {
    id: number;
    anime_id: number;
    name: string;
    active: boolean;
    image: string;
}

export type CharacterPreview = {
    anime: AnimeItemViewModel;
    name: string;
    description: string;
    stats: {
        hp: number;
        atk: number;
        def: number;
    };
    active: boolean;
    lock: boolean;
    artworkBlob: Blob;
    artworkPreview: string;
    smallArtworkBlob: Blob;
    smallArtworkPreview: string;
};
