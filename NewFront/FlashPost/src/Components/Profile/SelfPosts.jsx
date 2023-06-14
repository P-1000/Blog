import React, { useEffect , useState } from 'react'
import { Link } from 'react-router-dom'
import TimeLine from './TimeLine'

function SelfPosts() {

    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
      const fetchPosts = async () => {
        const res = await fetch('http://localhost:3000/api/blogs/author/Naruto')
        const data = await res.json()
        setBlogs(data)
      }
      fetchPosts()
    }, [])



  return (
    <div>
       {/* <div className='flex flex-wrap w-full'>
        <div className="container mt-2 flex">
   
      {
        blogs.map((blog) => (
         
      <div className='row   p-2 m-2 shadow-xl hover:shadow-sm transition-all delay-75'>
        <div className=''>
        <Link to={`/blog/Naruto/${blog._id}`}>
          <div className=''>
            <img src={blog.imgUrl} alt='' className='object-contain lazy-image-preview' />
        </div>
        </Link>
        <div>
          <div className='w-ful h- full p-1 m-[1px]  text-clip'>
            <h1 className='font-semibold from-neutral-600 p-2'>{blog.title}</h1>
            </div>
            </div>
        </div>
      </div>
      
        ))
      } 
      
       </div>
       </div> */}

<div>
  <TimeLine blogs={blogs} />
</div>

    </div>
  )
}

export default SelfPosts