import React, { useEffect, useState } from "react";
import Author from "./Author";
import AsideAuthor from "./AsideAuthor";
import { useParams } from "react-router-dom";
import {getBlogById} from "../../services/blogService";

import Output from "editorjs-react-renderer";
import EditorjsRender from "./EditorjsRender";
import AuthNew from "./AuthNew";
import FloatingTool from "./FloatingTool";
import instance from "../../Config/AxiosInst";

function BlogDetails() {
  const { AuthorId, blogId } = useParams();
  const [blog, setBlog] = useState({});
  const token = localStorage.getItem("jwt");
  const tok = JSON.parse(token);
  const config = {
    headers: { Authorization: `Bearer ${tok}` },
  };

  const redD = {
    time: 1691762867475,
    blocks: [
      {
        id: "IuBoCYC8LG",
        type: "header",
        data: { text: "FlashPost Blog Title", level: 2 },
      },
      {
        id: "xpE5269-6j",
        type: "paragraph",
        data: { text: "Please Wait While we load the blog..." },
      },
    ],
    version: "2.27.2",
  };

  const [authorDetails, setAuthorDetails] = useState({});

  const [con, setCon] = useState(redD);
  const [blogLike , setBlogLike] = useState(0);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getBlogById(blogId);
        const content =  await JSON.parse(response.data.blog.Content);
        setCon(content);
        setBlog(response.data);
        setAuthorDetails(response.data.authors[0]);
        setBlogLike(response?.data.blogStats?.LikeCount || 0)
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlog();
  }, [blogId]);


  return (
    <>
      <FloatingTool bid={blogId} likes={blogLike} />
      <div className="flex  overflow-hidden  bg-white lg:flex-col lg:place-content-center   lg:px-20 m-auto justify-center  items-center">
        <div>
          <div className="w-full  gap-10 justify-center  items-center  bg-white   bg-clip-padding overflow-auto">
            <div className="  ">
              {/* author details  */}

              <div className=" items-center flex flex-col justify-center p-3 bg-white  ">
                <div className=" flex  px-10 py-3 items-center justify-center">
                  <img
                    className="lg:w-10/12 lg:px-4 w-[30rem]  object-cover shadow-md rounded-md"
                    src={blog?.blog?.CoverImage}
                    alt={blog?.blog?.Title}
                  />
                </div>

                <div className="">
                  <h1 className="lg:text-4xl  text-2xl mx-10 flex flex-wrap px-2 lg:px-1 font-bold my-3 ">{blog?.blog?.Title}</h1>
                </div>
                <div className="w-full flex justify-center   items-center  bg-white  max-h-full bg-clip-padding overflow-auto">
                  {/* <Author post_id={blogId} name={blog.Author} /> */}
                  <AuthNew
                    post_id={blog.ID}
                    name={authorDetails?.Name}
                    date="Mar 16 , 2024"
                    readTime="3 min read"
                  />
                </div>
                <div className="flex gap-2 w-full">
                  <div className=" lg:py-4 px-7 lg:px-[12%] ">
                    <p>{blog?.blog?.Description}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className="w-full">
            <div className=" ">
              {blog?.blog?.Content ? <EditorjsRender data={con} /> : "Please Wait "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogDetails;
