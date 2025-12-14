type UserPowers = "Regular" | "Moderator" | "Admin"

export type AuthUser = {
    id: number;
    username: string;
    currency: number;
    level: number;
    user_power: UserPowers
}