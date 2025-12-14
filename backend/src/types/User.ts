export interface AuthUser {
    id: number;
    username: string;
    currency: number;
    level: number;
    user_power: "Regular" | "Moderator" | "Admin";
}
