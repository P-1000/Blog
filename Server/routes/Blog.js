import express from "express"
//import {updateUser} from "../Controllers/user.js"
import { verifyToken } from "../Verify.js"
import { addBlog, getAllBlogs, getBlogById } from "../Controllers/blog.js"

const blog_router = express.Router()

//add blog : /api/blogs/uploadBlog
blog_router.post('/uploadBlog', verifyToken , addBlog)


//update Blog:
blog_router.put("Update/:id", addBlog )

//get all blogs : 
blog_router.get("/allBlogs",verifyToken, getAllBlogs )

//get blog by Id : 
blog_router.get("/blog/:id",  getBlogById )

export default blog_router
