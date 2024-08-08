import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'

const useSignup = () => {
    const{setAuthUser} =useAuthContext()
const [loading,setLoading] = useState(false)
const signup = async({fullname,username,password,confirmPassword,gender})=>{
    const success = handleInputErrors({fullname,username,password,confirmPassword,gender})
    if(!success)
        return
    setLoading(true)
    try{
        const body ={
            fullname,
            username,
            password,
            confirmPassword,
            gender
        }
        const res = await axios.post('http://localhost:4000/api/auth/signup',body)
        console.log(res.data)
        if(res.status == 201){
            setAuthUser(res?.data?.data)
            localStorage.setItem("chat-user",JSON.stringify(res?.data?.data))
            toast.success(res?.data?.message)
        }
        else{
            throw new Error(res?.data?.error)
        }
    }
    catch(error){
        toast.error(error?.message)
    }
    finally{
        setLoading(false)
    }



}
return {loading,signup}
}

export default useSignup

function handleInputErrors({fullname,username,password,confirmPassword,gender}){

    if(!fullname || !username || !password || !confirmPassword || !gender)
    {
toast.error("Please fill all the fields")
        return false
    }
    if(password != confirmPassword){
        toast.error("passwords do not match")
        return false
    }
    if(password.length<6){
        toast.error("Password must be at least 6 characters")
        return false
    }
    return true
}