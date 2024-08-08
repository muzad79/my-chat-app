import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";



export const login =async(req,res)=>{
try{
    const {username,password} =req.body
    const user = await User.findOne({username})

    if(!user){
       return res.status(400).json({error:"no user found please register first"})
    }

   const isPasswordValid = await bcrypt.compare(password,user.password || "")
    if(!isPasswordValid){
        return res.status(400).json({error:"invalid credentials"})
    }

    await generateToken(user._id,res)
    res.status(201).json({message:"logged in successful",data:{
        _id:user._id,
        fullname:user.fullname,
        username:user.username,
        profilePic:user.profilePic

    }})

}
catch(err){
    console.log("error in login controller",err)
    return res.status(500).json({error:"internal server error"})
}


}

export const signup =async(req,res)=>{
try{


    const {username,fullname,password,confirmPassword,gender} = req.body;
    if(password !=confirmPassword){
       return res.status(400).json({error:"passwords do not match"})
    }
    const user = await User.findOne({username})
    if(user){
        return res.status(400).json({error:"user already exists"})
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
     const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`
     const newUser = new User({
        fullname,
        username,
        password:hashedPassword,
        gender,
        profilePic:gender === "male" ?boyProfilePic:girlProfilePic

     })
     if(newUser){
        await generateToken(newUser._id,res)
     await newUser.save();
     return res.status(201).json({message:"user registered successfully",data:{
        _id:newUser._id,
        fullname:newUser.fullname,
        username:newUser.username,
        profilePic:newUser.profilePic
     }})
    }
    else{
        return res.status(400).json({error:"invalid user data"})
    }
   
}
catch(err){
    console.log(err)
   return res.status(500).json({error:"internal server error"})
}



}

export const logout =(req,res)=>{

try{

res.cookie('jwt',"",{
    maxAge:0
})
return res.status(200).json({message:"Logged out successfully"})
}
catch(err){
    console.log("error in logout controller",err)
    return res.status(500).json({error:"internal server error"})
}

}