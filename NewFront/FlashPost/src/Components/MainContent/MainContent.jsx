import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BlogCardFooter from './BlogCardFooter';
import BlogCards from './BlogCards';
import ContentMenu from './ContentMenu';

function MainContent() {
  const token = localStorage.getItem('jwt');
  const tok = JSON.parse(token);
  const config = {
    headers: { Authorization: `Bearer ${tok}` },
  };
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState('personalised');

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axios.get('http://localhost:3000/api/blogs/allBlogs', config);
      const blog_data = response.data;
      const rev = response.data.reverse();
      setBlogs(rev);
    };
    fetchBlogs();
  }, []);

  const handleCategoryChange = (category) => {
    // Update the category state variable this function is called in ContentMenu.jsx and passed as a prop to ContentMenu.jsx
    setCategory(category);
  };

  return (
    <>
      <div className=''>
        <div className='mt-3  pt-5'>
          <div className='border rounded-md  bg-white   w-full font-bold text-primary py-6 '>
            <div className=''>
              <ContentMenu category={category} onCategoryChange={handleCategoryChange} /> 
              {/* // passing the function as a prop to ContentMenu.jsx */}
            </div>

            <div>
              {blogs &&
                blogs.map((blog) => {
                  // Filter blogs based on the selected category
                  if (category === 'personalised' || blog.category === category) {
                    return (
                      <div className='border-b-[1px]'>
                        <div>
                          <div>
                            <Link to={`/blog/@${blog.Author}/${blog._id}`}>
                              <BlogCards
                                Author={blog.Author}
                                desc={blog.desc}
                                title={blog.title}
                                imgUrl={blog.imgUrl}
                                blog_id={blog._id}
                                time={blog.createdAt}
                              />
                            </Link>
                          </div>
                          {blog.tags && (
                            <div className='mb-3'>
                              <BlogCardFooter id={blog._id} like={blog.likes} tag={blog.tags} />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainContent;
