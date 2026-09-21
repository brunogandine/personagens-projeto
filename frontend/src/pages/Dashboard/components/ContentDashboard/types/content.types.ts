export type CharacterItem = {
    id: number;
    anime_id: number;
    name: string;
    active: boolean;
    deleted_at: Date;
};

export type AnimeItem = {
    id: number;
    name: string;
    active: boolean;
    deleted_at: Date;
};

export type AnimeContentItem = {
    id: number;
    name: string;
    active: boolean;
    description?: string;
    deleted_at: Date;
};

export type CharacterContentItem = {
    id: number;
    anime_id: number;
    name: string;
    active: boolean;
    deleted_at: Date;
};

export type CharacterPreview = {
    anime: AnimeContentItem;
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
    anime: AnimeContentItem;
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
};

export type CharacterDelete = {
    id: number;
    name: string;
};

export type CharacterRestore = {
    id: number;
    name: string;
};
