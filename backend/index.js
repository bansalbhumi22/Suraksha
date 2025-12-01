import express from "express";
// import { createProxyMiddleware } from "http-proxy-middleware";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({
    path:'./.env'
})

const app=express()

const URI=process.env.MONGODB_URI;

const PORT=process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.send("Welcom to GyanSurakshHHHHaDarshan!!");
});
 
// try {
//    await mongoose.connect(URI,{
        
//     });
//     console.log("Connected to MONGODB!!");
// } catch (error) {
//     console.log("Error:",error);
// }
// app.use(
//   "/api",
//   createProxyMiddleware({
//     target: "https://localhost:5000/.com",
//     changeOrigin: true,
//   })
// );
app.listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`)
});