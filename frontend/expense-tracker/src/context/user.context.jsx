import React, {createContext, useState} from 'react'

export const Usercontext = createContext();

const UserProvider = ({children}) =>{
    const [user,setUser] = useState(null)

    //function to update user data
    const updateUser = (userData) =>{
        // console.log("After login idhar aaya",userData)
        setUser(userData)
    };

    //function to clear user data (eg on logout)
    const clearUser = () =>{
        setUser(null)
    }

    return (
        <Usercontext.Provider
        value ={{
            user,
            updateUser,
            clearUser,
        }}>
            {children}
        </Usercontext.Provider>
    )
}

export default UserProvider;