import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'

const useLogout = () => {
    const [loading,setLoading] = useState(false)
    const {setAuthUser} = useAuthContext()

    const logout =async()=>{
setLoading(true)
    try{
        const res = await axios.post('http://localhost:4000/api/auth/logout')
        if(res.status == 200 || res.status == 201){
            toast.success("logged out successfully")
        }
        else{
            throw new Error(res?.data?.error)
        }
        localStorage.removeItem("chat-user")
        setAuthUser(null)
    }
    catch(err){
        toast.error(err?.message)

    }
    finally{
        setLoading(false)
    }
    }
    return {loading,logout}
}

export default useLogout