import express from "express"
//import {updateUser} from "../Controllers/user.js"
import { verifyToken } from "../Verify.js"
import { addBlog, deleteBlog, findBlogsByAuthor, getAllBlogs, getBlogById, trendingBlogs, unlikeBlog , getPageBlogs } from "../Controllers/blog.js"
import { updateBlog } from "../Controllers/blog.js"
import { likeBlog } from "../Controllers/blog.js"


const blog_router = express.Router()

//add blog : /api/blogs/uploadBlog
blog_router.post('/uploadBlog', verifyToken , addBlog)


//update Blog:
blog_router.put("/update/:bid" , verifyToken , updateBlog )

//delete blog :
blog_router.delete("/delete/:bid" , verifyToken ,  deleteBlog )

//get all blogs : 
blog_router.get("/allBlogs" , getAllBlogs )

//get blog by Id : 
blog_router.get("/blog/:id",  getBlogById )

//get blogs with pagination : 
blog_router.get("/blogsPage/:skip" , getPageBlogs )


//tags count : on index page:

// increment likes count for a blog :
blog_router.put("/like/:bid" ,  likeBlog ) 

// decrement likes count for a blog :
blog_router.put("/dislike/:bid" ,  unlikeBlog )

// trending blogs :
blog_router.get("/trending" , trendingBlogs )

// get blogs by author :
blog_router.get("/author/:author" , findBlogsByAuthor  )

// todo:

export default blog_router
