import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { AuthUser } from "../types/authUser";
import { getMe } from "../services/authService";
import { Request } from "@/services/apiClient";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
    user: AuthUser | null
    setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
    login: (payload: {email: string, user_key: string}) => Promise<{ success: boolean, message?: string, errors?: Record<string, string> }>;
    logout: () => Promise<{ success: boolean, message?: string}>;
    loading: boolean,
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<AuthUser | null>(null)
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const loadUser = async () => {
            const data = await getMe();

            if(!data.success) {
                setUser(null);
                setLoading(false);

                return;
            };

            setUser(data.user);
            setLoading(false);
        }

        loadUser();
    }, []);

    useEffect(() => {
        const handleUnauthorized = () => {
            setUser(null);
            navigate("/");
        };

        window.addEventListener("unauthorized", handleUnauthorized);

        return () => {
            window.removeEventListener("unauthorized", handleUnauthorized);
        };
    }, [navigate]);

const login = async (payload: {email: string, user_key: string}) => { 
    try{ 
        const res = await Request.post( 
            "/auth/login", 
            payload, 
        ); 
        
        if(!res) 
            return { success: false };

        if(!res.ok) { 
            const formattedErrors: Record<string, string> = {}; 
            
            if(res.data.errors) { 
                res.data.errors.forEach((err: { field: string, message: string }) => { 
                    formattedErrors[err.field] = err.message; 
                })
            }; 
                
                return { success: false, errors: formattedErrors }; 
            }; 
            
            setUser(res.data.user ?? null); 
            
            return { success: true, message: "Login bem-sucedido" };
        } catch(err: any) { 
            return { success: false, message: "Erro de rede."} 
        }
    }

    const logout = async () => {
        try {
            const res = await Request.post(`/auth/logout`)

            if(!res)
                return { success: false }

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
    
    if(!ctx) 
        throw new Error("useAuth must be used inside AuthProvider");

    return ctx;
}

