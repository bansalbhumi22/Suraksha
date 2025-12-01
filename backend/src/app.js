import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app=express()

app.use(cors(
    {
    origin:process.env.CORS_ORIGIN,
    credentials:true
    }
))

app.use(express.json({limit:"16kb"}))// get data from json and set limit 
app.use(express.urlencoded({extended:true, limit:"16kb"}))// uses for data from url
app.use(express.static("public"))//static is use if i want to store any file or folder so it created a public folder

app.use(cookieParser())
import userRouter from "./routes/user.routes.js"
app.use("/api/v1/users",userRouter)


// app.post('/api/v1/users/register', (req, res) => {
//   const { firstname, lastname, phoneno, password } = req.body
//   console.log('Register body:', req.body)
//   // TODO: validate & save to DB
//   return res.status(201).json({ success: true, message: 'User created', data: { firstname, lastname, phoneno } })
// })


export {app}
