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
    data: {
        anime_id: number,
        currency_lock?: boolean,
        active?: boolean,
        attr_hp: number,
        attr_atk: number,
        attr_def: number,
        description: string,
        name: string,
    },
    artwork: {
        mimetype: string,
        buffer: Buffer
    },
    thumbnail: {
        mimetype: string,
        buffer: Buffer
    }
}

export type CreateCharacterData = {
    anime_id: number,
    currency_lock?: boolean,
    active?: boolean,
    attr_hp: number,
    attr_atk: number,
    attr_def: number,
    description: string,
    name: string,
}