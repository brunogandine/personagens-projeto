export type CharacterItem = {
    id: number;
    anime_id: number;
    name: string;
    active: boolean;
    deleted_at: Date | null;
    anime: {
        deleted_at: Date | null
    }
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

export type AnimeEdit = {
    id: number;
    name: string;
    description?: string;
    active: boolean;
};

export type AnimeDelete = {
    id: number;
    name: string;
};

export type AnimeRestore = {
    id: number;
    name: string;
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
};

export type CharacterDelete = {
    id: number;
    name: string;
};

export type CharacterRestore = {
    id: number;
    name: string;
};
