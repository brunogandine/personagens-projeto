export type CharacterItem = {
    id: number;
    anime_id: number;
    name: string;
    active: boolean;
    deleted_at: Date;
}

export type AnimeItem = {
    id: number;
    name: string;
    active: boolean;
    deleted_at: Date;
}

export type AnimeItemViewModel = {
    id: number;
    name: string;
    active: boolean;
    description?: string;
    deleted_at: Date;
    image: string;
}

export type CharacterItemViewModel = {
    id: number;
    anime_id: number;
    name: string;
    active: boolean;
    deleted_at: Date;
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
    thumbnailBlob: Blob;
    thumbnailPreview: string;
};

export type CharacterEdit = {
    id: number;
    anime: AnimeItemViewModel;
    name: string;
    description?: string;
    stats: {
        hp: number;
        atk: number;
        def: number;
    };
    active: boolean;
    lock: boolean;
    artwork: string;
    thumbnail: string;
}

export type CharacterDelete = {
    id: number;
    name: string;
}
