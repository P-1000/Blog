import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BlogCardFooter from './BlogCardFooter';
import BlogCards from './BlogCards';
import ContentMenu from './ContentMenu';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MainContent() {
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState('personalised');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`https://back-e0rl.onrender.com/api/blogs/blogsPage/${page}`);
      const blog_data = response.data;

      if (blog_data.length === 0) {
        setHasMore(false);
      } else {
        setBlogs((prevBlogs) => [...prevBlogs, ...blog_data]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setHasMore(true);
    setBlogs([]);
    fetchBlogs();
  }, [category]);

  useEffect(() => {
    if (category === 'trending') {
      setHasMore(false); // Disable infinite scroll for trending blogs
    } else {
      setPage(1); // Reset the page to 1 when switching to personalised category
    }
  }, [category]);

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 5 >= document.documentElement.offsetHeight) {
      if (!loading && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, hasMore]);

  useEffect(() => {
    if (page > 1) {
      setLoading(true);
      fetchBlogs();
    }
  }, [page]);

  return (
    <>
      <div className=''>
        <div className='mt-3 pt-5'>
          <div className='border rounded-md bg-white w-full font-bold text-primary py-6 '>
            <div className=''>
              <ContentMenu category={category} onCategoryChange={handleCategoryChange} />
            </div>

            <div>
              {loading && blogs.length === 0 && <div>Loading blogs...</div>}
              {!loading && blogs.length === 0 && <div>No blogs found.</div>}
              {blogs.map((blog) => (
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
              ))}
              {loading && <div>Loading more blogs...</div>}
              {!loading && !hasMore && <div>No more blogs to load.</div>}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default MainContent;
