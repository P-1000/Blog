import React, { useEffect, useState } from "react";
import BlogCards from "../MainContent/BlogCards";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Book = () => {
  const [user, setUser] = useState({});
  const [bookmark, setBookmark] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    setUser(currentUser);
    setBookmark(currentUser?.Bookmarks || []);
  }, [currentUser]);

  const fetchBlogData = async (blogId) => {
    const res = await fetch(`https://back-e0rl.onrender.com/api/blogs/blog/${blogId}`);
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    // Fetch blog data for each bookmarked blog ID
    const fetchBlogs = async () => {
      const blogDataPromises = bookmark.map((blogId) => fetchBlogData(blogId));
      const blogData = await Promise.all(blogDataPromises);
      setBlogs(blogData);
    };

    fetchBlogs();
  }, [bookmark]);

  return (
    <div>
      {blogs.map((blog) => (
        <div className="bg-white m-2 rounded-xl p-4 pr-10 mb-4 hover:scale-95 transition-all cursor-pointer">
        <Link to={`/blog/@${blog.Author}/${blog._id}`}>
        <BlogCards key={blog.blog_id} blog={blog} />
        </Link>
        </div>
      ))}
    </div>
  );
};

export default Book;
