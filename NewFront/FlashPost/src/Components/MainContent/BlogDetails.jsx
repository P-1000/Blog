import React, { useEffect, useState } from 'react';
import Author from './Author';
import AsideAuthor from './AsideAuthor';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import Output from 'editorjs-react-renderer';



function BlogDetails() {
  const { AuthorId, blogId } = useParams();
  const [blog, setBlog] = useState({});
  const token = localStorage.getItem('jwt');
  const tok = JSON.parse(token);
  const config = {
    headers: { Authorization: `Bearer ${tok}` }
  };


const redD =
  {"time":1691762867475,"blocks":[{"id":"IuBoCYC8LG","type":"header","data":{"text":"FlashPost Blog Title","level":2}},{"id":"xpE5269-6j","type":"paragraph","data":{"text":"Please Wait While we load the blog..."}}],"version":"2.27.2"}

  
  const [authorDetails, setAuthorDetails] = useState({});

  const [con , setCon] = useState(redD)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`https://back-e0rl.onrender.com/api/blogs/blog/${blogId}`, config);
        const blog_data = response.data;
        setBlog(blog_data);
        setCon(JSON.parse(blog_data.Content))
        console.log(JSON.parse(blog_data.Content));
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlog();
    fetchUserProfile();
  }, [blogId, config]);

  const fetchUserProfile = async () => {
    const res = await fetch(`https://back-e0rl.onrender.com/api/users/${blog.Author}`);  //todo
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
              <div className='text-sm text-gray-500 ml-5 font-normal text-ellipsis overflow-hidden'>
              {
                blog.Content ? <Output data={con} /> : 'red'
              }
{/* 
             {
              blog.Content ?<p>{blog.Content}</p> : 'red' 
             } */}
              </div>
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
