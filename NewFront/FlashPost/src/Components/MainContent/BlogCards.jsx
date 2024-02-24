import React from "react";
import { useState, useEffect } from "react";
import AuthoImg from "./AuthoImg";
import { BsBookmarkPlus } from "react-icons/bs";
import { motion } from "framer-motion";

function BlogCards(props) {
  if (props.blog === undefined) {
    return <div></div>;
  }
  const { imgUrl, title, desc, blog_id, Author, createdAt } = props.blog;
  const [s, sc] = useState("");
  const [coverImg, setcoverImg] = useState({});
  // Use the URL to display the image
  const img = new Image();

  const date = new Date(createdAt);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "Asia/Kolkata",
  };
  const formattedDate = date.toLocaleString("en-IN", options);

  const addBookmark = (blog_id) => {
    // const token = localStorage.getItem('user')
    console.log(blog_id);
  };

  return (
    <div>
      <div>
        {/* card header with author image and post title */}
        <div>
          <div className="flex gap-4">
            <div className="ml-5 mt-4 flex ">
              <AuthoImg author_name={Author} />
            </div>
            <div className="mt-4">
              <div>
                <h1 className="text-md font-bold text-primary">{Author}</h1>
                <p className="text-xs text-gray-500">{formattedDate}</p>
              </div>
              <div></div>
            </div>

            <div
              onClick={() => addBookmark(blog_id)}
              className="ml-28  mt-5 lg:hidden"
            >
              <BsBookmarkPlus className="text-xl text-primary-500" />
            </div>
          </div>
          <div className="flex lg:gap-5 gap-[13px] lg:flex-row flex-col ">
            <div className="flex flex-col w-10/12 lg:w-8/12">
              <div className="mt-4 ml-5">
                <h1 className="text-lg lg:text-xl font-bold text-primary hover:text-secondary ">
                  {title}
                </h1>
              </div>

              <div>
                <div className="w-full  mt-1">
                  {/* <p className='text-sm text-gray-500 ml-5 font-normal text-ellipsis  overflow-hidden ' 
                                dangerouslySetInnerHTML={{__html:desc}} > */}
                  <p className="text-sm hidden lg:block text-gray-500 ml-5 font-normal h-24 text-ellipsis overflow-hidden ">
                    {desc}
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:w-4/12 w-[86%] mx-2">
              <div className="mx-2 w-full lg:float-right">
                <motion.img
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.9 }}
                  whileDrag={{ scale: 0.9 }}
                  src={imgUrl}
                  style={{ width: "100%", height: "200px" }} // Set fixed dimensions here
                  className="rounded-md box-border object-cover border-primary shadow-lg hover:shadow-md transition-all"
                />
              </div>
            </div>
          </div>
        </div>
        {/* card body with post image and post description */}
        <div className="mt-1">
          <div className="flex">
            <div className="w-6/12"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogCards;
