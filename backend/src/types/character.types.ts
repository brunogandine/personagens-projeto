export type GetCharactersParams = {
    page?: number,
    search?: string,
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