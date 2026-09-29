import type { CreateCharacterSchema, UpdateCharacterSchema } from "@/validations/character.validations"

export type GetCharactersParams = {
    page?: number,
    search?: string,
}

export type CreateCharacterResponse = 
    | {
        message: string
    }
    | {
        type: "storage",
        errors: {
            message: string
        }[]
    }

export type EditCharacterResponse =
    | {
        type: "not_found",
        message: string
    }
    | {
        id: number;
        anime: {
            id: number
            name: string
            description: string | null
            active: boolean
        };
        name: string;
        description: string | null;
        stats: {
            hp: number;
            atk: number;
            def: number;
        };
        active: boolean;
        lock: boolean;
    }


export type CreateCharacterPayload = {
    data: CreateCharacterSchema,
    artwork?: {
        buffer: Buffer
        ext: string
    },
    thumbnail?: {
        buffer: Buffer
        ext: string
    }
};

export type UpdateCharacterPayload = {
    id: number;
    data: UpdateCharacterSchema
    artwork?: {
        buffer: Buffer;
        ext: string;
    };
    thumbnail?: {
        buffer: Buffer;
        ext: string
    }
};

export type UpdateCharacterData = {
    anime_id?: number | undefined;
    name?: string | undefined;
    description?: string | undefined;
    attr_hp?: number | undefined;
    attr_atk?: number | undefined;
    attr_def?: number | undefined;
    currency_lock?: boolean | undefined;
    active?: boolean | undefined;
}

export type DeleteCharacterPayload = {
    data: {
        ids: number[];
    }
}

export type RestoreCharacterPayload = {
    data: {
        ids: number[];
    }
}