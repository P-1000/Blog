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
  const [trendingBlogs, setTrendingBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axios.get('https://back-e0rl.onrender.com/api/blogs/allBlogs', config);
      const blog_data = response.data;
      const rev = response.data.reverse();
      setBlogs(rev);
    };

    const fetchTrendingBlogs = async () => {
      const response = await axios.get('https://back-e0rl.onrender.com/api/blogs/trending');
      const blog_data = response.data;
      setTrendingBlogs(blog_data);
    };

    fetchBlogs();
    fetchTrendingBlogs();
  }, []);

  const fetchBlogsre = async () => {
    const response = await axios.get('https://back-e0rl.onrender.com/blogs/allBlogs', config);
    const blog_data = response.data;
    const rev = response.data.reverse();
    setBlogs(rev);
  };

  const handleCategoryChange = (category) => {
    setCategory(category);
    if (category === 'trending') {
      setBlogs(trendingBlogs);
    } else if (category === 'personalised') {
      fetchBlogsre();
      setBlogs(blogs);
    }
  };

  return (
    <>
      <div className=''>
        <div className='mt-3  pt-5'>
          <div className='border rounded-md  bg-white   w-full font-bold text-primary py-6 '>
            <div className=''>
              <ContentMenu category={category} onCategoryChange={handleCategoryChange} />
            </div>

            <div>
              {blogs &&
                blogs.map((blog) => {
                  if (true) {
                    return (
                      <div className='border-b-[1px]' key={blog._id}>
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
