// app.mjs
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.mjs'; // Use '.mjs' for ESM modules
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.mjs'
import postRoutes from './routes/postRoutes.mjs'
import messageRoutes from './routes/messageRoutes.mjs'
import {v2 as cloudinary} from 'cloudinary'
import {app, server} from './socket/socket.mjs'
import path from 'path';

dotenv.config();
connectDB();


const PORT = process.env.PORT || 5000;
const __dirname= path.resolve();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

//middelwares
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

//Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);

//http://localhost:5000=>backend,frontend

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"/thread-app/build")))

    //react-app
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"thread-app","build","index.html"))
    })
}

server.listen(PORT, () => console.log(`Server started at port http://localhost:${PORT}`));
