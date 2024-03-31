import express from 'express';
import {config} from 'dotenv';
import { connectDB } from './data/database.js';
import mongoose from 'mongoose';
import authRoutes from "./api/routes/auth.js"
import userRoutes from './api/routes/user.js';
import hotelRoutes from "./api/routes/hotels.js";
import roomRoutes from './api/routes/room.js';
import cookieParser from "cookie-parser";
import cors from "cors";


config({
    path:'./.env'
})

const app = express();

const PORT = process.env.PORT;

app.get("/",(req,res)=>{
    res.send("server is running")
})

connectDB();

mongoose.connection.on("disconnected",()=>{
    console.log("disconnected from mongoDB");
})


//middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/hotel",hotelRoutes);
app.use("/api/room",roomRoutes);

app.use((err,req,res,next)=>{
    const errorStatus = err.status||500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status : errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});




app.listen(PORT,(req,res)=>{
    console.log(`server is running on port ${PORT}`);
})