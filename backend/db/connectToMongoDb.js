import mongoose from "mongoose";
export const connectToMongoDb =async()=>{

try{
    console.log(process.env.MONGO_DB_URI)
await mongoose.connect(process.env.MONGO_DB_URI);
console.log("connected to mongodb")
}
catch(err){

    console.log("error connecting to mongo db",err)
}
}