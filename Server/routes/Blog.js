import express from "express"
//import {updateUser} from "../Controllers/user.js"
import { verifyToken } from "../Verify.js"
import { addBlog, 
    deleteBlog, 
    findBlogsByAuthor, 
    getAllBlogs, 
    getBlogById,
    isBlogLiked, 
    undislikeBlog,  
    trendingBlogs, 
    unlikeBlog ,
     getPageBlogs , 
     NewlikeBlog ,
     bookmarkBlog
    } 
     from "../Controllers/blog.js"
import { updateBlog } from "../Controllers/blog.js"
import { likeBlog } from "../Controllers/blog.js"
import { blogDeleteAdmin } from "../Controllers/blog.js"
import { isAdmin } from "../isAdmin.js"


const blog_router = express.Router()

//add blog : /api/blogs/uploadBlog
blog_router.post('/uploadBlog', verifyToken , addBlog)


//update Blog:
blog_router.put("/update/:bid" , verifyToken , updateBlog )

//delete blog :
blog_router.delete("/delete/:bid" , verifyToken  ,   deleteBlog )

//get all blogs : 
blog_router.get("/allBlogs" , getAllBlogs )

//get blog by Id : 
blog_router.get("/blog/:id",  getBlogById )

//get blogs with pagination : 
blog_router.get("/blogsPage/:skip" , getPageBlogs )


//tags count : on index page:

// increment likes count for a blog :
// blog_router.put("/like/:bid" ,  likeBlog ) 

blog_router.put("/like/:bid" , verifyToken ,  NewlikeBlog)

blog_router.put("/unlike/:bid" , verifyToken , undislikeBlog)

// decrement likes count for a blog :
blog_router.put("/dislike/:bid" ,  unlikeBlog )

// trending blogs :
blog_router.get("/trending" , trendingBlogs )

// get blogs by author :
blog_router.get("/author/:author" , findBlogsByAuthor  )


blog_router.get("/isliked/:bid/:id"  ,  isBlogLiked);

//Add blog to bookmark :
blog_router.put("/bookmark/:bid" , verifyToken ,  bookmarkBlog )


// todo:




//admin Routes : 
blog_router.delete("/admin/delete/:bid" , isAdmin , blogDeleteAdmin )



export default blog_router
