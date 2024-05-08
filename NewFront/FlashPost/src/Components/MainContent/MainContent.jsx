import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContentMenu from './ContentMenu';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PersonalisedBlogs from './PersonalisedBlogs';
import TrendingBlogs from './TrendingBlogs';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../Utils/Spinner';
import TextEditor from '../BlogCreation/EditorJs';
import instance from '../../Config/AxiosInst';

function MainContent() {
  const [personalisedBlogs, setPersonalisedBlogs] = useState([]);
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const [category, setCategory] = useState('personalised');
  const [loading, setLoading] = useState(true);
  const [personalisedPage, setPersonalisedPage] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  //flag for hasMore
  const [more,setMore] = useState(true)

  const fetchPersonalisedBlogs = async (page) => {
    try {
      // const response = await axios.get(`https://back-e0rl.onrender.com/api/blogs/blogsPage/${page}`);
      const response = await instance.get(`/api/blogs/blogsPage/${page}`);
      const blog_data = response.data;
      if(blog_data.length == 0) setMore(false)
      return blog_data;
    } catch (error) {
      console.error('Error fetching personalised blogs:', error);
    }
  };

  const fetchTrendingBlogs = async () => {
    try {
      // const response = await axios.get(`https://back-e0rl.onrender.com/api/blogs/trending`);
      const response = await instance.get(`/api/blogs/trending`);
      const blog_data = response.data;
      setTrendingBlogs(blog_data);
    } catch (error) {
      console.error('Error fetching trending blogs:', error);
    }
  };

  const fetchMorePersonalisedBlogs = async () => {
    setIsFetching(true);
    try {
      const nextPage = personalisedPage + 1;
      const moreBlogData = await fetchPersonalisedBlogs(nextPage);
      setPersonalisedBlogs(prevBlogs => [...prevBlogs, ...moreBlogData]);
      setPersonalisedPage(nextPage);
    } catch (error) {
      console.error('Error fetching more personalised blogs:', error);
    }
    setIsFetching(false);
  };

  useEffect(() => {
    fetchPersonalisedBlogs(personalisedPage).then(blogData => {
      setPersonalisedBlogs(blogData);
    });
    fetchTrendingBlogs();
  }, []);

  const handleCategoryChange = (category) => {
    setCategory(category);
    setPersonalisedPage(0);
  };

  return (
    <>
      <div className=''>
        <div className='mt-3 pt-5'>
          <div className='border rounded-md bg-white w-full font-bold text-primary py-6 '>
            <div className=''>
              <ContentMenu category={category} onCategoryChange={handleCategoryChange} />
            </div>

            <div className='m-4 px-4'>
              {category === 'personalised' && (
                <InfiniteScroll
                  dataLength={personalisedBlogs?.length}
                  next={fetchMorePersonalisedBlogs}
                  hasMore={more}
                  loader={<h4 className='mx-10 px-10 mt-10 text-center animate-bounce'>Loading More Blogs...</h4>}
                  endMessage={<p className='mx-10 px-10 mt-10 text-center text-secondary animate-pulse'>No more blogs to load.</p>}
                >
                  <PersonalisedBlogs blogs={personalisedBlogs} />
                </InfiniteScroll>
              )}
              {category === 'trending' && 
              <TrendingBlogs blogs={trendingBlogs} />
              }
              {
                category === 'mostRecent' && <div> No Blogs To Load.. </div>
              }
              {
                category === 'sort' && <div> No Blogs To Load.. </div>
              }
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default MainContent;
