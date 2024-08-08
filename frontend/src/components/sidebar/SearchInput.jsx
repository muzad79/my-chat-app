import React, { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations';
import toast from 'react-hot-toast';
const SearchInput = () => {

  const [search,setSearch]  =useState("")
const{setSelectedConversation}=useConversation()
const{conversations}=useGetConversations()
  const handleSearch=(e)=>{
e.preventDefault()
if(!search){
  toast.error("search field cant be empty")
  return
}

if(search.length<3){
  toast.error("Search length should not be less than 3")
  return
}
const conversation = conversations.find((c)=>c?.fullname.toLowerCase().includes(search.toLowerCase()))

if(conversation){

  setSelectedConversation(conversation)
  setSearch("")
}
else{
  toast.error("No user found")
}



  }
  return (
    
        <form className='flex items-center gap-2' onSubmit={handleSearch}>
            <input type='text' placeholder='Search...' className='input input-bordered rounded-full'
            value={search} onChange={(e)=>{setSearch(e.target.value)}}
            />
            <button className='btn btn-circle bg-sky-500 text-white'>
                <IoSearchSharp className='w-6 h-6 outline-none'/>
            </button>
        </form>
    
  )
}

export default SearchInput