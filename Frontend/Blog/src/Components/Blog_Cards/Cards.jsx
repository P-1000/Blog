import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link } from 'react-router-dom';
//import quill
import ReactQuill from 'react-quill';

function Cards() {

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
      setBlogs(response.data);
    }
    fetchBlogs();
  },[])
  const fetchBlogs = async () => {
    const response = await axios.get('http://localhost:3000/api/blogs/allBlogs', config);
    console.log(response.data , "blog data ");
    setBlogs(response.data);
  }

  const data = {
    title: 'My Card Title',
    subtitle: 'My Card Subtitle',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: 'https://picsum.photos/200/300',
  };

    const arr = [1,2,3,4,5,6,7,8,9,10]

  return (
    <div className='flex flex-wrap gap-4 mx-14 px-2'>
        {blogs.map((item) => (
           <div className='w-56'>
           <Card>
      <CardHeader title={item.title} subheader={data.subtitle} />
      <Link to={`/blogDetails/${item._id}`}>
      <CardContent>
        <img src={item.imgUrl} alt="card" />
        <Typography variant="body2" color="text.secondary">
        <ReactQuill
   value={item.desc}
   readOnly={true}
   theme={"bubble"}
/>
        </Typography>
      </CardContent>
      </Link>
    </Card>
           </div>
            
        ))}
        <button onClick={fetchBlogs}>Fetch Blogs</button>
    </div>
    
  );
}

export default Cards;
