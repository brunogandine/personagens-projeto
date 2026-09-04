import type { CreateCharacterSchema, UpdateCharacterSchema } from "@/validations/character.validations"

export type GetCharactersParams = {
    page?: number,
    search?: string,
}

export type CharacterCreationResponse = 
    | {
        message: string
    }
    | {
        type: "storage",
        errors: {
            message: string
        }[]
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

export type CreateCharacterData = {
    anime_id: number,
    name: string,
    description: string,
    attr_hp: number,
    attr_atk: number,
    attr_def: number,
    currency_lock?: boolean,
    active?: boolean,
}