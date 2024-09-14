import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react"
import { User } from "../models/user"
import instance from "./instance"

export interface UserContextInterface{
    user: User|null,
    setUser: Dispatch<SetStateAction<User|null>>
}

const defaultState = {
    user: null,
    setUser: (user:User) => {}
} as UserContextInterface


export const UserContext = createContext(defaultState);

export function UserProvider({children}:{children: ReactNode}){
    const [user, setUser] = useState<User| null>(null)
    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const checkifloggedIn = async () => {
    let url = 'applicant/'
    const resp = await instance.get(url)
    if (resp.status === 200){
       const  user: User = resp.data
       return user 
    }
    return null
}

