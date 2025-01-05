import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

//Database Conenction
const connection_URL = process.env.DATABASE_URL;
export const connectDB = () => {
    mongoose.connect(connection_URL, {
    })
        .then(()=> console.log("DB connected"))
        .catch((e)=> console.log(e));
}