import { createContext, useEffect, useState } from "react";
import { supabase } from "../supabase/client";
const UserContext = createContext()

const UserProvider = ({ children }) => {

    const [session, setSession] = useState()
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            console.log("nice work by ream ");
        })
    }, [])
    return (
        <UserContext.Provider value={{ setSession, session }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }