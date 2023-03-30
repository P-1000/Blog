import React from 'react'
import { useEffect , useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactQuill from 'react-quill'
import axios from 'axios'

function BlogDetails() {
    const { id } = useParams()
    //headers for authorization
    const token = localStorage.getItem('jwt');
    const tok = JSON.parse(token);
    const config = {
        headers: { Authorization: `Bearer ${tok}` }
    }
    const [blog, setBlog] = useState(null)
    const [isPending, setIsPending] = useState(true)
    useEffect(() => {
        async function fetchBlog() {
            const response = await axios.get(`http://localhost:3000/api/blogs/blog/${id}`, config)
            setBlog(response.data)
            console.log(response.data)
        }   
        fetchBlog()

    },[id])
     const createdAtString = blog ? blog.createdAt : "error"
     const createdAtDate = new Date(createdAtString)
     const dateString1 = createdAtDate.toString()
     const dateString2 = dateString1.slice(0, 15)
     console.log(dateString1)
  return (
    <div>
      <h1 className='text-3xl p-4'>{blog ? blog.title : "error "}</h1>
        <div>
       <h2> {blog ? dateString2 : "error"}</h2>
        </div>
        <div>
            <img src={blog ? blog.imgUrl : "erro" }/>
        </div>
        <div>
        <ReactQuill
   value={blog ? blog.desc : "erro"}
   readOnly={true}
   theme={"bubble"}
/>
        </div>
    </div>
  )
}

export default BlogDetails
