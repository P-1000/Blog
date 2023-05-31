import React from 'react'
import { useEffect , useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactQuill from 'react-quill'
import axios from 'axios'
import { useSelector } from 'react-redux'


function BlogDetails() {
  const { currentUser } = useSelector(state => state.user);

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

     const handleDelete = async () => {
      try {
        const response = await axios.delete(`http://localhost:3000/api/blogs/delete/${id}`, config)
        console.log(response)
      } catch (error) {
        next(error)
      }
     }

  return (
    <div>
      <h1 className='text-3xl p-4'>{blog ? blog.title : "error "}</h1>
      <Link to={`/updateBlog/${blog?._id}`}>
        <div >
        {
          // if the user is logged in and the user's id matches the blog's user id, show the edit button
          currentUser && currentUser?._id === blog?.userId ? (
          <div>
          <button className='border border-blue-200 px-2 py-1 mx-6'>
              Edit Blog
            </button>
          </div>
          ) : (
            <div> You cannot edit</div>
          )
        }
        </div>
        </Link>
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
        {/* delete blog */}
        <div>
            {
              currentUser && currentUser?._id === blog?.userId ? <div>
                <button
                onClick={handleDelete}
                 className='border border-blue-200 px-2 py-1 mx-6'>
              Delete Blog
            </button>
              </div> 
              : 
              <div>you cannot delete mf!</div>
            }
        </div>
    </div>
  )
}

export default BlogDetails
