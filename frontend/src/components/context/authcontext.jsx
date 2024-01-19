import { createContext, useEffect, useState } from "react";
import axios from "axios"
const AuthContext = createContext();
const AuthContextProvider =({children})=>{
    const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem("user"))||null)
    const login =async(form)=>{
        
        const response =await axios.post("http://localhost:4000/api/auth/login",form,{
            withCredentials:true,
        })
    setCurrentUser(response.data)
        // setCurrentUser({
        //     id:2,
        //     name:"kebebe",
        //     profilepic:"https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=600"
        // })
    }
    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(currentUser))
    },[currentUser])
return(
    <AuthContext.Provider value ={{currentUser,login}} >
        {children}
    </AuthContext.Provider>
)

}

export {AuthContext,AuthContextProvider}