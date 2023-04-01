import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/User.js"
import authRoutes from "./routes/auth.js"
import cookieparser from "cookie-parser"
import cors from 'cors';
import blogRouter from "./routes/blog.js"
import blog_router from "./routes/blog.js"

const app = express()
app.use(cors());
dotenv.config()

app.use(cors({
    origin: 'http://localhost:5174'
  }));

const connect = () =>{
    console.log("waiting for the Db")
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log("Database connected")
    }).catch(err => {throw err})
}
 
app.use(cookieparser())
app.use(express.json())

app.get("/", (req, res) => {
    console.log("Server Running Bro!")
})

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/blogs", blog_router)


app.use((err,req,res,next)=>{
    const status = err.status || 500
    const message = err.message || "Something went wrong"
    return res.status(status).json({
        succuess:false,
        message,
        status,
    })
})


app.listen(3000 , ()=>{
    console.log("Server running on port 3000")
    connect()
})


//K1x7Ne0KAIfLBzCa

// mongodb+srv://earnvpn:<password>@cluster0.7xjnfdn.mongodb.net/?retryWrites=true&w=majority