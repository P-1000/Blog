clear// import Blog from '../Models/blog.js'
import Blog from "./Mblog.js";
import { createError } from "../error.js";
import express from "express";
import multer from "multer";
import path from "path";
import { BlogLike } from "../Models/Like.js";
import User from "../Models/User.js";
import { clear } from "console";

// creating new blog
export const addBlog = async (req, res, next) => {
  const newBlog = new Blog({ userId: req.user.id, ...req.body });
  try {
    if (req.file) {
      newBlog.imgUrl = req.file.path;
    }
    const savedBlog = await newBlog.save();
    console.log(savedBlog);
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
    blog.Content = updatedData.Content;
    blog.description = updatedData.Content;
    const updatedBlog = await blog.save();
    res.status(200).json(updatedBlog);
  } catch (err) {
    next(err);
  }
};

//delete blog
export const deleteBlog = async (req, res, next) => {
  const blogId = req.params.bid;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    
    if (blog.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await Blog.findByIdAndDelete(blogId);
    res.status(200).json({ message: "Blog deleted successfully" });
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
};

//get blogs with pagination : or inifinite scrolling thing :

export const getPageBlogs = async (req, res, next) => {
  const limit = 8;
  const page = req.params.skip || 0; // Number of the page to fetch
  const skip = page * limit; // Calculate the number of blogs to skip

  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);
    res.status(200).json(blogs);
  } catch (err) {
    next(err);
  }
};

//get a blog by id:
export const getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.status(200).json(blog);
  } catch (err) {
    next(err);
  }
};

// increment likes count for a blog :
export const likeBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.bid);
    blog.likes += 1;
    const updatedBlog = await blog.save();
    res.status(200).json(updatedBlog).message("Liked");
  } catch (err) {
    next(err);
  }
};

// decrement likes count for a blog :
export const unlikeBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.bid);
    if(blog){
      res.status(404).json("blog not found!");
      return;
    }
    blog.likes -= 1;
    const updatedBlog = await blog.save();
    res.status(200).json(updatedBlog);
  } catch (error) {
    next(error);
  }
};

// trending blogs :
export const trendingBlogs = async (req, res, next) => {
  try {
    // fetch only 30 blogs
    const blogs = await Blog.find().sort({ likes: -1 }).limit(30);
    res.status(200).json(blogs);
  } catch (err) {
    next(err);
  }
};

//todo ; change to id in the author blog section : 
//find blogs by author :

export const findBlogsByAuthor = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ Author: req.params.author });
    res.status(200).json(blogs);
  } catch {
    next(err);
    res.status(err);
  }
};

//get blogs by following authors :
export const getBlogsByFollowingAuthors = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ Author: req.params.author });
    // set timeout for 5 seconds

    res.status(200).json(blogs);
  } catch {
    next(err);
    res.status(err);
  }
};

// new like function with updated schema :
export const NewlikeBlog = async (req, res, next) => {
  try {
    const blogId = req.params.bid;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const existingLike = await BlogLike.findOne({
      blogId: blog._id,
      userId: req.user.id,
    });

    if (existingLike) {
      return res
        .status(402)
        .json({ message: "User has already liked this blog" });
    }

    const newLike = new BlogLike({ blogId: blog._id, userId: req.user.id });
    await newLike.save();

    blog.likes += 1;
    await blog.save();

    res.status(200).json({ message: "Blog liked successfully" });
  } catch (err) {
    next(err);
  }
};

// Undislike a blog
export const undislikeBlog = async (req, res, next) => {
  try {
    const blogId = req.params.bid;
    const user89 = req.user.id;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return next(createError(404, "Blog not found"));
    }

    const existingLike = await BlogLike.findOne({
      blogId: blog._id,
      userId: user89,
    });

    if (!existingLike) {
      return next(createError(400, "User has not disliked this blog"));
    }

    await BlogLike.deleteOne({
      blogId: blog._id,
      userId: user89,
    });

    blog.likes -= 1;
    await blog.save();

    res
      .status(200)
      .json({ success: true, message: "Blog undisliked successfully" });
  } catch (err) {
    next(err);
  }
};

//check if current user liked the blog or not :
export const isBlogLiked = async (req, res, next) => {
  const blogId = req.params.bid;
  const userId = req.params.id || req.user.id;
  try {
    const likedBlog = await BlogLike.findOne({ blogId, userId });
    const isLiked = !!likedBlog;
    res.status(200).json({ isLiked });
  } catch (error) {
    console.error("Error checking if blog is liked:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// delete blog by id for admin :
export const blogDeleteAdmin = async (req, res, next) => {
  const blogId = req.params.bid;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    if (req.user.role !== "hashira") {
      return res
        .status(401)
        .json({ message: "You are not authorized to delete this blog" });
    }

    await Blog.findByIdAndDelete(blogId);
    res
      .status(200)
      .json({ message: "Blog deleted successfully by Kyōjurō Rengoku" });
  } catch (err) {
    next(err);
  }
};

//add blog to bookmark :

export const bookmarkBlog = async (req, res, next) => {
  try {
    const blog_id = req.params.bid;
    if (blog_id == null) {
      // if blog id is null
      return res
        .status(400)
        .json({ message: "Error Bookmarking Blog : Blog Id Null!" });
    }

    const blog = await Blog.findById(blog_id);
    if (blog == null) {
      return res
        .status(400)
        .json({ message: "Error Bookmarking Blog : Blog Not Found!" });
    }

    const usr = req.user.id;
    const user = await User.findById(usr);

    if (user == null) {
      return res
        .status(400)
        .json({ message: "Error Bookmarking Blog : User Not Found!" });
    }

    const isBookmarked = await user.Bookmarks.includes(blog_id);

    if (isBookmarked) {
      return res
        .status(400)
        .json({ message: "Error Bookmarking Blog : Blog Already Bookmarked!" });
    }

    // add blog to bookmarks :
    await user.Bookmarks.push(blog_id);
    await user.save();
    res.status(200).json({ message: "Blog Bookmarked Successfully!" });
  } catch (error) {
    next(error);
  }
};

// like a blog
