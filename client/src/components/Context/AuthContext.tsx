import { createContext, useContext, useEffect, useState, } from "react";
import { API_URL } from "../../config";

const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext)
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()

    useEffect(() => {
        fetch(`${API_URL}cookies`, {

            credentials: "include",
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data)
                if (data.user) {
                    setUser(data.user)
                }
            })
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, }}>
            {children}
        </AuthContext.Provider>
    );
};
