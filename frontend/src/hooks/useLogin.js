import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'

const useLogin = () => {
    const {setAuthUser} = useAuthContext()
    const [loading,setLoading] =useState(false)
  const login = async({username,password})=>{
    setLoading(true)
    const success = handleInputErrors({username,password})
    if(!success)
        return

try{
    const body = {
        username,
        password
    }
const res = await axios.post('http://localhost:4000/api/auth/login',body) 

if(res.status == 200 || res.status == 201){
    toast.success(res?.data?.message)
    localStorage.setItem('chat-user',JSON.stringify(res?.data?.data))
    setAuthUser(res?.data?.data)
}
else{
    throw new Error(res?.data?.error)
}

}
catch(err){
    toast.error(err.message)
}
finally{
setLoading(false)

}

  }
  return {loading,login}
}

export default useLogin

function handleInputErrors({username,password}){

    if( !username || !password)
    {
toast.error("Please fill all the fields")
        return false
    }
  
    if(password.length<6){
        toast.error("Password must be at least 6 characters")
        return false
    }
    return true
}