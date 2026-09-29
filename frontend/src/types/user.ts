export type User = {
    id: number;
    username: string;
    avatar_url: string | null;
}

export type UserAdmin = User & {
    email: string;
    active: boolean;
    currency: number;
    level: number;
}

export type UserRanking = User & {
    level: number;
}