import React from 'react'
import BlogCardFooter from './BlogCardFooter'
import BlogCards from './BlogCards'
import ContentMenu from './ContentMenu'
import { useEffect , useState } from 'react'
import axios from 'axios'


function MainContent() {
    const token = localStorage.getItem('jwt');
    const tok = JSON.parse(token);
    const config = {
        headers: { Authorization: `Bearer ${tok}` }
    }
    const [blogs, setBlogs] = useState([]);
    //fetching all blogs from database :
    useEffect(()=>{
      const fetchBlogs = async () => {
        const response = await axios.get('http://localhost:3000/api/blogs/allBlogs', config);
        console.log(response.data , "blog data ");
        const blog_data = response.data
        const rev = response.data.reverse()
        setBlogs(rev);
      }
      fetchBlogs();
    },[])
blogs.map((blog)=>{
  blog.Author
})

  return (
    <>
  <div className=''>
    <div className='mt-3  pt-5'>
    <div className='border rounded-md  bg-white   w-full font-bold text-primary py-6 '>
        <div className=''>
        <ContentMenu/>
        </div>
     
   <div>
      
   {blogs && blogs.map((blog)=>{
      return(
        <div>
        <div>
      <div>
                <BlogCards 
                Author={blog.Author}
                desc= {blog.desc}
                title={blog.title}
                imgUrl={blog.imgUrl}
                blog_id={blog._id}
                time={blog.createdAt}
                 />
            </div>
         {
            blog.tags &&    <div className='mb-3'>
            <BlogCardFooter tag={blog.tags} />
        </div>
         }
            </div> </div> 
      )
    })}
   </div>


        

     
        
    </div>

    
    </div>
  </div>
 
 </>
  )
}

export default MainContent
