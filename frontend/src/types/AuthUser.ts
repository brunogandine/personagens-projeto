import type { User } from "./user";

type UserPowers = "Regular" | "Moderator" | "Admin"

export type AuthUser = User & {
    email: string;
    currency: number;
    level: number;
    user_power: UserPowers
}