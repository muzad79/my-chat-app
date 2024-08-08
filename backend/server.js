import express from "express"
import { config } from "dotenv"
import authRoutes from './routes/authRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { connectToMongoDb } from "./db/connectToMongoDb.js"
import cookieParser from "cookie-parser"
import cors from 'cors'
import { app ,server} from "./socket/socket.js"
config()


const PORT = process.env.PORT || 3000
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies)
  };
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth',authRoutes)
app.use('/api/message',messageRoutes)
app.use('/api/user',userRoutes)

app.get('/',(req,res)=>{res.send("hi from chat")})
server.listen(PORT,()=>{
    connectToMongoDb()
    console.log(`server is running on http://localhost:${PORT}`)
})