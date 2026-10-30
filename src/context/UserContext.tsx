import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"

export const UserContext = createContext<User | null>(null)


export const UserProvider = ({children}:{children:ReactNode}) => {
    const [name, setName] = useState<string | null>(null)
    const clearName = async () => {
        try {
            await AsyncStorage.removeItem("User")
            setName(null)
        } catch (e) {
            console.log(e)
        }
    }

    const updateName = async (value:string) => {
        try {
            await storeUser(value)
            setName(value)
        } catch (e){
            console.log(e)
        }
    }
    const fetchUser = async () => {
        try {
            const user = await AsyncStorage.getItem("User")
            if(!user) return
            const savedName = JSON.parse(user)
            setName(savedName)
        } catch (e){
            console.log(e)
        }
    }
    const storeUser = async (value:string) => {
        try {
            const user = JSON.stringify(value)
            await AsyncStorage.setItem("User", user)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        fetchUser()
    }, [])
    return(
        <UserContext.Provider value={{name, updateName, clearName}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const user = useContext(UserContext)
    if (!user) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return user
}