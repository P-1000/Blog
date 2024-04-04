import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TimeLine from "./TimeLine";
import { Chrono } from "react-chrono";

function SelfPosts() {
  const [items, setItems] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(
        "https://back-e0rl.onrender.com/api/blogs/author/Naruto"
      );
      const data = await res.json();
      setBlogs(data);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchPosts2 = async () => {
      const mappedItems = blogs.map((blog) => ({
        title: blog.title,
        cardTitle: blog.Author,
        url: "https://back-e0rl.onrender.com/",
        cardSubtitle: blog.desc,
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

    if (blogs.length > 0) {
      fetchPosts2();
    }
  }, [blogs]);

  return (
    <div>
      <div>
        {/* <TimeLine blogs={blogs} /> */}
        {items.length > 0 ? (
          <Chrono
            items={items}
            buttonTexts={{
              first: "Jump to First",
              last: "Jump to Last",
              next: "Next",
              previous: "Previous",
            }}
            cardHeight={200}
            mode="VERTICAL_ALTERNATING"
            textOverlay
          />
        ) : (
          "Loading...."
        )}
      </div>
    </div>
  );
}

export default SelfPosts;
