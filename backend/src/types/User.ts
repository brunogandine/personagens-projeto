export interface User {
    id: number;
    username: string;
    email: string;
    user_key: string;
    activation_key: string;
    reset_password_key: string;
    active: string;
    currency: number;
    level: number;
    created_at: Date;
    activated_at: Date;
}
