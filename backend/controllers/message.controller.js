import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"
import { getRecieverSocketId, io } from "../socket/socket.js"


export const sendMessage =async(req,res)=>{

try{
    const {message} = req.body
const {id:recieverId} = req.params
const senderId = req.user._id


let conversation = await Conversation.findOne({
    participants:{$all:[senderId,recieverId]}
})

if(!conversation){
   conversation = await Conversation.create({
        participants:[senderId,recieverId]
    })
}
const newMessage = new Message({
    senderId,
    recieverId,
    message
})
if(newMessage){
    conversation.messages.push(newMessage._id)
}
//this will take time
// await conversation.save()
// await newMessage.save()
//this will run in parallel
await Promise.all([ conversation.save() ,newMessage.save()])

//socket io implementation

const recieverSocketId = getRecieverSocketId(recieverId)
if(recieverSocketId){

    io.to(recieverSocketId).emit("newMessage",newMessage)
}
res.status(201).json(newMessage)
}
catch(err){

    console.log("error in sendMessage controller",err)
    res.status(500).json({error:"Internal server error"})
}
    
}
export const getMessage = async(req,res)=>{
    try{

        const {id:chatWithUserId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants:{$all:[senderId,chatWithUserId]}
        }).populate("messages")
        if(!conversation){
           return res.status(200).json([])
        }
        const messages = conversation.messages

        res.status(200).json(messages)

    }
    catch(err){
 console.log("error in getMessage controller",err)
    res.status(500).json({error:"Internal server error"})

    }
}