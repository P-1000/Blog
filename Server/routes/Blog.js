import express from "express"
//import {updateUser} from "../Controllers/user.js"
import { verifyToken } from "../Verify.js"
import { addBlog, deleteBlog, getAllBlogs, getBlogById } from "../Controllers/blog.js"
import { updateBlog } from "../Controllers/blog.js"


const blog_router = express.Router()

//add blog : /api/blogs/uploadBlog
blog_router.post('/uploadBlog', verifyToken , addBlog)


//update Blog:
blog_router.put("/update/:bid" , verifyToken , updateBlog )

//delete blog :
blog_router.delete("/delete/:bid" , verifyToken ,  deleteBlog )

//get all blogs : 
blog_router.get("/allBlogs", verifyToken , getAllBlogs )

//get blog by Id : 
blog_router.get("/blog/:id",  getBlogById )

//tags count :



export default blog_router
