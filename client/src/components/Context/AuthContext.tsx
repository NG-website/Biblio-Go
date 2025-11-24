import { createContext, useContext, useEffect, useState, } from "react";

const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext)
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()

    useEffect(() => {
        fetch("http://localhost:3000/cookies", {

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
