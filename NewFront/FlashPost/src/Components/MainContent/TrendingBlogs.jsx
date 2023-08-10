import React from 'react';
import BlogCards from './BlogCards'; 
import BlogCardFooter from './BlogCardFooter';
import { Link } from 'react-router-dom';

function TrendingBlogs({ blogs }) {
  return (
    <div>
      {blogs.map((blog) => (
        <div className='border-b-[1.5px] ' key={blog._id}>
          <Link to={`/blog/@${blog.Author}/${blog._id}`}>
            <BlogCards blog={blog} />
          </Link>
          <div className='mb-4'>
            <BlogCardFooter id={blog._id} like={blog.likes} tag={blog.tags} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default TrendingBlogs;
