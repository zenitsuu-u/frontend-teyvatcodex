import { createContext, useState, type ReactNode } from "react";

export interface AuthContextType {
    token: string | null;
    role: string;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    token: null,
    role: "user",
    login: () => {},
    logout: () => {}
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );

    const payload = token ? JSON.parse(atob(token.split(".")[1])) : null;
    const role = payload?.role || "user";

    const login = (newToken: string) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, role, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}