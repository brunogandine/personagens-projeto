export const getUsersCount = async () => {
    const res = await fetch("http://localhost:3000/api/users/counts", {
        credentials: "include",
    })

    if(!res.ok) return null

    const data = await res.json()

    return data.count
}

export const getCharactersCount = async () => {
    const res = await fetch("http://localhost:3000/api/characters/counts", {
        credentials: "include",
    })

    if(!res.ok) return null;

    const data = await res.json();

    return data.count;
}