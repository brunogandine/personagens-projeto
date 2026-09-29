import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { AuthUser } from "../types/AuthUser";
import { getMe } from "../services/authService";

type AuthContextType = {
    user: AuthUser | null
    setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
    login: (payload: {email: string, user_key: string}) => Promise<{ success: boolean, message?: string, errors?: Record<string, string> }>;
    logout: () => Promise<{ success: boolean, message?: string}>;
    loading: boolean,
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<AuthUser | null>(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const data = await getMe();

            if(!data.success) {
                setUser(null);
                setLoading(false);

                return;
            };

            setUser(data.user);
            setLoading(false);
        }

        load();
    }, []);

    const login = async (payload: {email: string, user_key: string}) => {
        try{
            const res = await fetch(`${BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(payload)
            })

            const data = await res.json();

            if(!res.ok) {
                const formattedErrors: Record<string, string> = {};

                if(data.errors) {
                    data.errors.forEach((err: { field: string, message: string }) => {
                        formattedErrors[err.field] = err.message;
                    })
                };

                return { success: false, errors: formattedErrors };
            };

            setUser(data.user ?? null);

            return { success: true, message: "Login bem-sucedido" };
        } catch(err: any) {
            return { success: false, message: "Erro de rede."}
        }
    }

    const logout = async () => {
        try {
            const res = await fetch(`${BASE_URL}/api/auth/logout`, {
                method: "POST",
                credentials: "include"
            });

            if (!res.ok) {
                return { success: false, message: "Erro ao realizar logout." }
            }

            setUser(null);
            return { success: true };
        } catch(err) {
            return { success: false, message: "Erro de rede."}
        }
    }

    return (
        <AuthContext.Provider value={{user, setUser, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if(!ctx) throw new Error("useAuth must be used inside AuthProvider");

    return ctx;
}

