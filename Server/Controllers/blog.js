// import Blog from '../Models/blog.js'
import Blog from './Mblog.js';
import { createError } from '../error.js'
import express from 'express'
import multer from 'multer';
import path from 'path';

// Configure multer options
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   }
// });

// const upload = multer({ storage: storage });

// creating new blog
export const addBlog = async (req, res, next) => {
    const newBlog = new Blog({ userId: req.user.id, ...req.body });
    try {
      if (req.file) {
        newBlog.imgUrl = req.file.path;
      }
      const savedBlog = await newBlog.save();
      console.log(savedBlog)
      res.status(200).json(savedBlog);
    } catch (err) {
      next(err);
    }
  };

//update a blog by id
export const updateBlog = async (req, res, next) => {
  const blogId = req.params.bid;

  try {
    const blog = await Blog.findById(blogId);
    const updatedData = req.body;
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    blog.title = updatedData.title;
    blog.imgUrl = updatedData.imgUrl;
    blog.desc = updatedData.desc;
    blog.tags = updatedData.tags;
    
    blog.description = updatedData.content;
    const updatedBlog = await blog.save();
    res.status(200).json(updatedBlog);
  } catch (err) {
    next(err);
  }
};


//delete a blog by id
export const deleteBlog = async (req, res, next) => {
  const blogId = req.params.bid;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (blog.userId !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // delete blog
    await Blog.findByIdAndDelete(blogId);
    res.status(200).json({ message: "Blog deleted successfully" });
  }catch (err) {
    next(err);
  }
}

// get all blogs
export const getAllBlogs = async (req, res, next) => {
    try {
      const blogs = await Blog.find();
      res.status(200).json(blogs);
    } catch (err) {
      next(err);
    }
  }

  //get blogs with pagination : or inifinite scrolling thing : 

  export const getPageBlogs = async (req, res, next) => {
    const limit = 8;
    const page = req.params.skip || 0; // Number of the page to fetch
    const skip = page * limit; // Calculate the number of blogs to skip
  
    try {
      const blogs = await Blog.find().sort({ createdAt: -1 }).limit(limit).skip(skip);
      res.status(200).json(blogs);
    } catch (err) {
      next(err);
    }
  };
  
  





//get a blog by id: 
export const getBlogById = async (req , res , next) =>{
  try{
      const blog = await Blog.findById(req.params.id)
      res.status(200).json(blog)
  }catch(err){
    next(err)
  }
}  

// increment likes count for a blog :
export const likeBlog = async (req , res , next) =>{
  try{
      const blog = await Blog.findById(req.params.bid)
      blog.likes += 1
      const updatedBlog = await blog.save()
      res.status(200).json(updatedBlog).message("Liked")
  }catch(err){
    next(err)
  }
}

// decrement likes count for a blog :
export const unlikeBlog = async (req , res , next) =>{
  try {
    
    const blog = await Blog.findById(req.params.bid)
    blog.likes -= 1;
    const updatedBlog = await blog.save()
    res.status(200).json(updatedBlog)
  } catch (error) {
      next(error)
  }
}

// trending blogs : 
export const trendingBlogs = async (req , res , next) =>{
  try{
    // fetch only 30 blogs
    const blogs = await Blog.find().sort({likes : -1}).limit(30)
    res.status(200).json(blogs)
  }
  catch(err){ next(err)} }


  //find blogs by author : 

  export const findBlogsByAuthor = async (req , res , next) =>{
    try{
      const blogs = await Blog.find({Author : req.params.author})
      res.status(200).json(blogs)
    }catch{
      next(err);
      res.status(err)
    }
  }

  //get blogs by following authors :
  export const getBlogsByFollowingAuthors = async (req , res , next) =>{
    try{
      const blogs = await Blog.find({Author : req.params.author})
      // set timeout for 5 seconds

      res.status(200).json(blogs)
    }catch{
      next(err);
      res.status(err)
    }
  }