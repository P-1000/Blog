import React, { useState, useEffect } from "react";
import { Chrono } from "react-chrono";


const TimeLine = (props) => {
  const { blogs } = props;
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const mappedItems = blogs.map((blog) => ({
        title: blog.title,
        cardTitle: blog.Author,
        url: "https://back-e0rl.onrender.com/",
        // cardSubtitle: blog.desc,
        cardSubtitle : "hello",
        // cardDetailedText: blog.updatedAt,
        media: {
          type: "IMAGE",
          source: {
            url: blog.imgUrl,
          },
        },
      }));
      setItems(mappedItems);
    };

    
    fetchPosts();
  }, []);

  console.log(items)
  return (
    <div>
      {/* <Home blogs={blogs} /> */}
      <Chrono items={items} mode="VERTICAL" />
    </div>
  );
};

export default TimeLine;
