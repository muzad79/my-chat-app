import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute =async(req,res,next)=>{

    try{
        const token = req.cookies.jwt
        console.log(token,"^^^^^^^^^^^^^^^^^^^^^")
        if(!token){
            return res.status(401).json({error:"Unauthorized - no token provided"})
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        if(!decoded){
            return res.status(401).json({error:"Unauthorized - Invalid token"})
        }
        const user = await User.findById(decoded.userId).select("-password")
        if(!user){
            return res.status(404).json({error:"user not found"})
        }
        req.user = user
        next()

    }
    catch(e){
        console.log("error in auth middleware",e)
        res.status(500).json({error:"internal server error"})
    }
}

export default protectRoute