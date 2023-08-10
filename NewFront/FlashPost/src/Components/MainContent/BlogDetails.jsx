import React, { useEffect, useState } from 'react';
import Author from './Author';
import AsideAuthor from './AsideAuthor';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

function BlogDetails() {
  const { AuthorId, blogId } = useParams();
  console.log(AuthorId, blogId);
  const [blog, setBlog] = useState({});
  const token = localStorage.getItem('jwt');
  const tok = JSON.parse(token);
  const config = {
    headers: { Authorization: `Bearer ${tok}` }
  };

  const [authorDetails, setAuthorDetails] = useState({});

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`https://back-e0rl.onrender.com/api/blogs/blog/${blogId}`, config);
        console.log(response.data, "blog data ");
        const blog_data = response.data;
        setBlog(blog_data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlog();
    fetchUserProfile();
  }, [blogId, config]);

  const fetchUserProfile = async () => {
    const res = await fetch(`https://back-e0rl.onrender.com/api/users/${blog.Author}`);
    const data = await res.json();
    setAuthorDetails(data);
  };

  const renderContent = () => {
    try {
      const contentObj = JSON.parse(blog.Content);
      const converter = new QuillDeltaToHtmlConverter(contentObj.ops, {});
      return <div dangerouslySetInnerHTML={{ __html: converter.convert() }} />;
    } catch (error) {
      console.error('Error parsing content JSON:', error);
      return <p>{blog.Content}</p>;
    }
  };

  return (
    <>
      <div className='flex det w-full h-[100vh]  rounded-md bg-clip-padding'>
        <div className='det w-full h-[100vh]  rounded-md bg-clip-padding  '>
          <div className=''>
            {/* author details  */}
            <Author post_id={blogId} name={blog.Author} />
          </div>

          <div className='w-8/12 mx-20 my-10'>
            <div>
              <h1 className='text-4xl font-bold my-3 '>{blog.title}</h1>
            </div>
            <div className='tracking-wide py-4'>
              <p>{blog.desc}</p>
            </div>
            <div>
              <img className='w-full object-cover shadow-md rounded-md' src={blog.imgUrl} alt={blog.title} />
            </div>
            <div className='my-5'></div>
            <div>
              <div className='text-sm text-gray-500 ml-5 font-normal text-ellipsis overflow-hidden'>{renderContent()}</div>
            </div>
          </div>
        </div>
        <div>
          <AsideAuthor Author={authorDetails} />
        </div>
      </div>
    </>
  );
}

export default BlogDetails;
