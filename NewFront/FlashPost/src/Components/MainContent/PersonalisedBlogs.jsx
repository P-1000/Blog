import React from 'react';
import BlogCards from './BlogCards'; 
import BlogCardFooter from './BlogCardFooter'
import { Link } from 'react-router-dom';

function PersonalisedBlogs({ blogs }) {

  

  return (
    <div>
      {blogs.map((blog) => (
       <div className='border-b-[1.5px] '>
       <Link to={`/blog/@${blog.Author}/${blog?._id}`}>
       <BlogCards key={blog?._id} blog={blog} />
       </Link>
       <div className='mb-4'>
       <BlogCardFooter id={blog?._id} like={blog?.likes} tag={blog?.tags}/>
       </div>
         </div>
      ))}
    </div>
  );
}

export default PersonalisedBlogs;
