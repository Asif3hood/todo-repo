import mongoose from "mongoose";
import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();
const connectToDatabase = async () =>{
    try{
        const connection = await mongoose.connect(
            process.env.MONGO_URI,
        )
        if(connection){
            console.log("Connection established");
        }
    }catch (error){
        console.log('error in connectToDatabase', error);
        throw (error);
    }
}

export default connectToDatabase;