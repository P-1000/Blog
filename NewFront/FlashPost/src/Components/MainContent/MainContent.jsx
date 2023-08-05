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
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [loadedBlogIds, setLoadedBlogIds] = useState(new Set());

  const fetchBlogs = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://back-e0rl.onrender.com/api/blogs/blogsPage/${page}`, config);
      const blog_data = response.data;

      if (blog_data.length === 0) {
        // No more blogs to load
        setHasMore(false);
      } else {
        // If it's the first page, directly set the blogs
        // Otherwise, append the new blogs to the existing ones
        if (page === 1) {
          setBlogs(blog_data);
        } else {
          setBlogs((prevBlogs) => [...prevBlogs, ...blog_data]);
        }

        // Add the IDs of newly loaded blogs to the loadedBlogIds set
        const newBlogIds = new Set(blog_data.map((blog) => blog._id));
        setLoadedBlogIds((prevLoadedBlogIds) => new Set([...prevLoadedBlogIds, ...newBlogIds]));
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching blogs:', error);
    }
  };

  const fetchTrendingBlogs = async () => {
    try {
      const response = await axios.get('https://back-e0rl.onrender.com/api/blogs/trending');
      const blog_data = response.data;
      setBlogs(blog_data);
    } catch (error) {
      console.error('Error fetching trending blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlogs(pageNumber);
    fetchTrendingBlogs();
  }, [pageNumber]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (!loading && hasMore) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasMore, loading]); // Add scroll event listener when hasMore or loading changes

  const handleCategoryChange = (category) => {
    setCategory(category);
    if (category === 'trending') {
      setBlogs([]); // Clear the blogs to reset
      fetchTrendingBlogs();
      setHasMore(true); // Reset hasMore flag
      setLoadedBlogIds(new Set()); // Reset loaded blog IDs
    } else if (category === 'personalised') {
      setBlogs([]); // Clear the blogs to reset
      setPageNumber(1); // Reset page number to fetch from the beginning
      setHasMore(true); // Reset hasMore flag
      setLoadedBlogIds(new Set()); // Reset loaded blog IDs
    }
  };

  return (
    <>
      <div className=''>
        <div className='mt-3 pt-5'>
          <div className='border rounded-md bg-white w-full font-bold text-primary py-6 '>
            <div className=''>
              <ContentMenu category={category} onCategoryChange={handleCategoryChange} />
            </div>

            <div>
              {blogs &&
                blogs
                  .filter((blog, index, self) => self.findIndex((b) => b._id === blog._id) === index) // Filter out duplicates
                  .map((blog) => {
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
                  })}
              {loading && <div>Loading more blogs...</div>}
              {!loading && !hasMore && blogs.length === 0 && <div>No blogs found.</div>}
              {!loading && !hasMore && blogs.length > 0 && <div>No more blogs to fetch.</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainContent;
