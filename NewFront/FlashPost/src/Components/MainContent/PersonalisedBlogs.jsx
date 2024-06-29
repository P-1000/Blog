import React from "react";
import BlogCards from "./BlogCards";
import BlogCardFooter from "./BlogCardFooter";
import { Link } from "react-router-dom";

function PersonalisedBlogs({ blogs }) {
  console.log(blogs)
  return (
    <div>
      {blogs.map((blog) => (
        <div className="border-b-[1.5px] ">
          <Link to={`/blog/@${blog?.authors[0].Name}/${blog?.ID}`}>
            <BlogCards key={blog?._id} blog={blog} />
          </Link>
          <div className="mb-4">
            <BlogCardFooter
              id={blog?._id}
              like={blog?.likeCount}
              tag={blog?.Tags}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default PersonalisedBlogs;
