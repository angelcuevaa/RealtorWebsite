import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({
    user: null,
    setUser: () => { },
});


export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const value = { user, setUser };

    useEffect(() => {

        console.log("UserProvider useEffect", user);

    }, [user]);

    return (
        <UserContext.Provider value={ value }>{children}</UserContext.Provider>
    );
}