import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const useGetConversations = () => {

    const [loading,setLoading] = useState(false)
    const [conversations,setConversations] = useState([]);

    useEffect(()=>{
        const getConversations = async()=>{
            setLoading(true)
            try{

                axios.defaults.withCredentials = true;
                const res = await axios.get('http://localhost:4000/api/user')
                if(res.status == 200 || res.status == 201){

                    setConversations(res.data)
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

        getConversations()

    },[])

    return {loading,conversations}

}

export default useGetConversations