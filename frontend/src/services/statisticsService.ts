import { Request } from "./apiClient"

export const getUsersCount = async () => {
    const res = await Request.get(`/users/counts`);

    if(!res || !res.ok)
        return { success: false };

    return res.data.count
}

export const getCharactersCount = async () => {
    const res = await Request.get(`/characters/counts`);

    if(!res || !res.ok)
        return { success: false };

    return res.data.count;
}