import mongoose from "mongoose";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const connectToDatabase = async () => {
    try {

        const connection = await mongoose.connect(`mongodb+srv://fg1OE88ZxfioxoOv:fg1OE88ZxfioxoOv@cluster0.awfknyx.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0`);

        if (connection) {
            console.log("Connection established");
        }
    } catch (error) {
        console.log('Error in connectToDatabase:', error);
        throw error;
    }
}

export default connectToDatabase;
