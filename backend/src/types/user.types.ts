export type GetParams = {
    page?: number,
    limit?: number,
    search?: string, 
    sortBy?: string, 
    order?: "asc" | "desc"
};

export type GetUserCharactersParams = {
    id: number,
    page?: number,
    search?: string
};