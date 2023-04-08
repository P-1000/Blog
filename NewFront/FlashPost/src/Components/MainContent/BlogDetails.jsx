import React, { useEffect } from 'react'
import Author from './Author'
import AsideAuthor from './AsideAuthor'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'


function BlogDetails() {

  const { AuthorId, blogId } = useParams();
  console.log(AuthorId, blogId)
  const [blog, setBlog] = useState([]);
  const token = localStorage.getItem('jwt');
  const tok = JSON.parse(token);
  const config = {
      headers: { Authorization: `Bearer ${tok}` }
  }
  useEffect(()=>{
    try {
      const fetchBlog = async () => {
        const response = await axios.get(`http://localhost:3000/api/blogs/blog/${blogId}`, config);
        console.log(response.data , "blog data ");
        const blog_data = response.data
        setBlog(blog_data);
        console.log(blog)
      }
      fetchBlog();
    } catch (error) {
      console.log(error)
    }
  },[])

  return (
   <>
<div className='flex det w-full h-[100vh]  rounded-md bg-clip-padding'>
<div className='det w-full h-[100vh]  rounded-md bg-clip-padding  '>
    <div className=''>
        {/* author details  */}
        <Author 
        post_id={blogId}
        name={blog.Author}/>
    </div>

    <div className='w-8/12 mx-20 my-10'>
    <div> 
       <h1 className='text-4xl font-bold my-3 '>{blog.title}</h1>
    </div>
    <div className='tracking-wide py-4'>
      <p>{blog.desc}</p>
    </div>
    <div>
      <img 
      className='w-full object-cover shadow-md rounded-md'
      src={blog.imgUrl} />
    </div>
    <div>
    <div className='text-sm text-gray-500 ml-5 font-normal text-ellipsis  overflow-hidden ' 
                                dangerouslySetInnerHTML={{__html:blog.content}} >

                                  </div>
    </div>
    </div>
    
   </div>
   <div>
    <AsideAuthor/>
   </div>
</div>
    

   </>
  )
}

export default BlogDetails