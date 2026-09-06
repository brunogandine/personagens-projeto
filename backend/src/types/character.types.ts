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

export type EditCharacterPayload = {
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
}