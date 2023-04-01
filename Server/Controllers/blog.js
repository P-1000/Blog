import Blog from '../Models/blog.js'
import { createError } from '../error.js'
import express from 'express'

// creating new blog
export const addBlog = async (req, res, next) => {
    const newBlog = new Blog({ userId: req.user.id, ...req.body });
    try {
      const savedBlog = await newBlog.save();
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
    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (deletedBlog.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    next(error)
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

//get a blog by id: 
export const getBlogById = async (req , res , next) =>{
  try{
      const blog = await Blog.findById(req.params.id)
      res.status(200).json(blog)
  }catch(err){
    next(err)
  }
}  


