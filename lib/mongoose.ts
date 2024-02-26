import mongoose from "mongoose";

let isConnected = false;// variable to check connections status

export const connectToDB = async() =>{
    mongoose.set("strictQuery", true); //prevent unkown field queries

    if(!process.env.MONGODB_URL) return console.log("MongoDB not found")
    if(isConnected) return console.log("It is already connected to mongoDB")
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        isConnected = true
        console.log("connected to mongoDB")
    }catch(err){
        console.log(err)
    }   


}
