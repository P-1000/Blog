import React, { useState, useEffect } from "react";
import ContentMenu from "./ContentMenu";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PersonalisedBlogs from "./PersonalisedBlogs";
import TrendingBlogs from "./TrendingBlogs";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

function MainContent() {
  const [personalisedBlogs, setPersonalisedBlogs] = useState([]);
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const [category, setCategory] = useState("personalised");
  const [loading, setLoading] = useState(true);
  const [personalisedPage, setPersonalisedPage] = useState(1);
  const [more, setMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const fetchPersonalisedBlogs = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/feed/general/${page}`
      );
      const blogData = response.data;
      if (blogData.length === 0) setMore(false);
      return blogData;
    } catch (error) {
      console.error("Error fetching personalised blogs:", error);
      return [];
    }
  };

  const fetchTrendingBlogs = async () => {
    try {
      const response = await axios.get(`/api/blogs/trending`);
      const blogData = response.data;
      setTrendingBlogs(blogData);
    } catch (error) {
      console.error("Error fetching trending blogs:", error);
    }
  };

  const fetchMorePersonalisedBlogs = async () => {
    setIsFetching(true);
    try {
      const nextPage = personalisedPage + 1;
      const moreBlogData = await fetchPersonalisedBlogs(nextPage);
      setPersonalisedBlogs((prevBlogs) => [...prevBlogs, ...moreBlogData]);
      setPersonalisedPage(nextPage);
    } catch (error) {
      console.error("Error fetching more personalised blogs:", error);
    }
    setIsFetching(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const blogData = await fetchPersonalisedBlogs(personalisedPage);
        setPersonalisedBlogs(blogData);
      } catch (error) {
        console.error("Error fetching personalised blogs:", error);
      } finally {
        setLoading(false);
      }
      fetchTrendingBlogs();
    };
    fetchData();
  }, []);

  const handleCategoryChange = (category) => {
    setCategory(category);
    setPersonalisedBlogs([]); // Clear previous blogs
    setPersonalisedPage(1);
    setMore(true); // Reset more flag
  };

  return (
    <>
      <div className="mt-3 pt-5">
        <div className="border rounded-md bg-white w-full font-bold text-primary py-6 ">
          <div className="">
            <ContentMenu
              category={category}
              onCategoryChange={handleCategoryChange}
            />
          </div>

          <div className="m-4 px-4">
            {category === "personalised" && (
              <InfiniteScroll
                dataLength={personalisedBlogs?.length}
                next={fetchMorePersonalisedBlogs}
                hasMore={more}
                loader={
                  <div className="mx-10 px-10 mt-10 text-center">
                    <h4>Loading More Blogs...</h4>
                  </div>
                }
                endMessage={
                  <div className="mx-10 px-10 mt-10 text-center">
                    <p>No more blogs to load.</p>
                  </div>
                }
              >
                <PersonalisedBlogs blogs={personalisedBlogs} />
              </InfiniteScroll>
            )}
            {category === "trending" && <TrendingBlogs blogs={trendingBlogs} />}
            {category === "mostRecent" && (
              <div>No most recent blogs available.</div>
            )}
            {category === "sort" && <div>No sorted blogs available.</div>}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default MainContent;
