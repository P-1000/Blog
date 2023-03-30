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


  