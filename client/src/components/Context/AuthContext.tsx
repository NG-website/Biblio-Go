import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { API_URL } from "../../config";
interface UserType {
    id: string;
    name?: string;
    email?: string;
}

// Typage du contexte
interface AuthContextType {
    user: UserType | null;
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}

// Création du contexte avec une valeur par défaut
const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => { },
});

export const useAuthContext = () => {
    return useContext(AuthContext);
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
            fetch(`${API_URL}cookies`, {
                credentials: "include",
            })
                .then(res => res.json())
                .then(data => {
                    if (data.user) {
                        setUser(data.user)
}
                });
    }, []);
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
