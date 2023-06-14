import React, { useState, useEffect } from "react";
import { Chrono } from "react-chrono";

const Home = (props) => {
  const { blogs } = props;
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const mappedItems = blogs.map((blog) => ({
        title: blog.title,
        cardTitle: blog.Author,
        url: "http://localhost:5173/",
        cardSubtitle: blog.desc,
        cardDetailedText: blog.updatedAt,
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
  }, [blogs]);

  return (
    <div>
      <Chrono items={items} mode="VERTICAL" />
    </div>
  );
};

const TimeLine = (props) => {
  const { blogs } = props;

  return (
    <div>
      <Home blogs={blogs} />
    </div>
  );
};

export default TimeLine;
