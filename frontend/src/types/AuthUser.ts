type UserPowers = "Regular" | "Moderator" | "Admin"

export type AuthUser = {
    id: number;
    email: string;
    username: string;
    currency: number;
    level: number;
    user_power: UserPowers
    avatar_url: string | null;
}