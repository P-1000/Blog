import React, { useEffect, useState } from "react";
import Author from "./Author";
import AsideAuthor from "./AsideAuthor";
import { useParams } from "react-router-dom";
import axios from "axios";

import Output from "editorjs-react-renderer";
import EditorjsRender from "./EditorjsRender";
import AuthNew from "./AuthNew";
import FloatingTool from "./FloatingTool";

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

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `https://back-e0rl.onrender.com/api/blogs/blog/${blogId}`,
          config
        );
        const blog_data = response.data;
        setBlog(blog_data);
        setCon(JSON.parse(blog_data.Content));
        console.log(JSON.parse(blog_data.Content));
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlog();
    fetchUserProfile();
  }, [blogId]);

  const fetchUserProfile = async () => {
    const res = await fetch(
      `https://back-e0rl.onrender.com/api/users/${blog.Author}`
    ); //todo
    const data = await res.json();
    setAuthorDetails(data);
  };

  const renderContent = () => {
    try {
      const contentObj = JSON.parse(blog.Content);
      const converter = new QuillDeltaToHtmlConverter(contentObj.ops, {});
      return <div dangerouslySetInnerHTML={{ __html: converter.convert() }} />;
    } catch (error) {
      console.error("Error parsing content JSON:", error);
      return <p>{blog.Content}</p>;
    }
  };

  return (
    <>
    <FloatingTool/>
      <div className="flex   bg-white flex-col place-content-center   px-20 m-auto justify-center  items-center">
        <div className="w-full  gap-10 justify-center   items-center  bg-white  max-h-full bg-clip-padding overflow-auto">
        {/* <Author post_id={blogId} name={blog.Author} /> */}
        <AuthNew post_id={blogId} name={blog.Author} />
        </div>
        <div>
          <div className="w-full  gap-10 justify-center  items-center  bg-white   bg-clip-padding overflow-auto">
            <div className="  ">
              {/* author details  */}
              
              <div className=" items-center flex flex-col justify-center p-3 bg-white  ">
                <div className=" flex  px-10 py-3 items-center justify-center">
                  <img
                    className="w-10/12 px-4  object-cover shadow-md rounded-md"
                    src={blog.imgUrl}
                    alt={blog.title}
                  />
                </div>
                <div>
                  <h1 className="text-4xl font-bold my-3 ">{blog.title}</h1>
                </div>
                <div className="flex gap-2 w-full">
                  <div className=" py-4 px-[12%] ">
                    <p>{blog.desc}</p>
                  </div>
                </div>
                {/* <div className='my-5'></div> */}
              </div>
            </div>
            {/* <div>
          <AsideAuthor Author={blog} />
        </div> */}
          </div>
          <div className="w-full">
            <div className=" ">
              {blog.Content ? <EditorjsRender data={con} /> : "Please Wait "}
              {/* 
             {
              blog.Content ?<p>{blog.Content}</p> : 'red' 
             } */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogDetails;
