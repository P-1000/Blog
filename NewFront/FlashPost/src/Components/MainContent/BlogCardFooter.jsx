import React, { useEffect, useState } from 'react';
import { BsBookmarkPlus } from 'react-icons/bs';
import { SlLike } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import BiLike from 'react-icons/bi';
// import BiSolidLike from 'react-icons/bi';
import {BiLike,BiSolidLike} from "react-icons/bi"
import { motion } from 'framer-motion';


function BlogCardFooter(props) {
  const [countTag, setCountTag] = useState(0);
  const [like, setLike] = useState(props.like);
  const [isLiked, setIsLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  const { tag } = props;

  const token = localStorage.getItem('jwt');
  const tok = JSON.parse(token);
  const config = {
    headers: { Authorization: `Bearer ${tok}` }
  };

  

  useEffect(() => {
    tag.map((tag) => {
      setCountTag((prev) => prev + 1);
    });
  }, []); // Empty dependency array ensures the effect runs only once when component mounts

  const [cuid , setCuid] = useState('');
  useEffect(() => {
    const checkIsLiked = async () => {
    
  const usid = localStorage.getItem('user');
  const us = JSON.parse(usid);
  setCuid(us._id);
      try {
        if(!cuid){
          return;
        }
        const response = await axios.get(
          `https://back-e0rl.onrender.com/api/blogs/isliked/${props.id}/${cuid}`,
          config
        );
        setIsLiked(response.data.isLiked);
        console.log(response);
        
      } catch (error) {
        console.error('Error checking if blog is liked:', error);
      }
    };
    checkIsLiked();
  }, [props.id, config ,cuid]);


  async function handleLike() {
    if (!token) {
      window.location.href = '/login';
      return;
    }

    try {
      if (isLiked) {
        
        await axios.put(
          `https://back-e0rl.onrender.com/api/blogs/unlike/${props.id}`,
          null,
          config
        );
        setLike(like - 1);
        setIsLiked(false);
      } else {
        
        await axios.put(
          `https://back-e0rl.onrender.com/api/blogs/like/${props.id}`,
          null,
          config
        );
        setLike(like + 1);
        setIsLiked(true);
      }
    } catch (error) {
      console.error('Error handling like:', error);
    }
  }

  async function handleDislike() {
   try {
    await axios.put(
      `https://back-e0rl.onrender.com/api/blogs/unlike/${props.id}`,
      null,
      config
    );
    setLike(like - 1);
    setIsLiked(false);
   } catch (error) {
      console.log(error)
   }
  }



  const handleBookmarks = async () => {
    if (!token) {
      window.location.href = '/login';
      return;
    } else {
      // TODO: Add blog to bookmarks
    }
  };

  return (
    <div className='flex justify-between mt-4'>
      <div>
        <div className='flex gap-4 lg:gap-8'>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            whileDrag={{ scale: 0.9 }}
            onClick={handleBookmarks}
            className='ml-5 hidden lg:block cursor-pointer'
          >
            <BsBookmarkPlus className='text-2xl text-primary-500' />
          </motion.div>
          <div className='flex gap-[.2em] ml-5'>
            <Link to={`/search/${tag ? tag[0] : 'Blog'}`}>
              <p className='border lg:text-[.8rem] text-[12px] font-medium rounded-full px-[14px] py-[1px]'>
                {tag ? tag[0] : 'Blog'}
              </p>
            </Link>
            <Link to={`/search/${tag ? tag[1] : 'FlashPost'}`}>
              <p className='border lg:text-[.8rem] text-[12px] font-medium rounded-full px-[14px] py-[1px]'>
                {tag ? tag[1] : 'FlashPost'}
              </p>
            </Link>
            <p className='border lg:text-[.8rem] text-[12px] font-medium rounded-full px-[14px] py-[1px]'>
              {countTag ? countTag : 0}
              <span className='font-medium'>+</span>
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className='mx-10'>
          <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          
          className='flex lg:block gap-1 flex-row-reverse '>
          {
            isLiked ? <BiSolidLike className='text-2xl text-primary-500  transition-all shadow-custom' onClick={handleLike}/> 
            : <BiLike className='text-2xl text-primary-500  transition-all' onClick={handleLike}/>
          }
            {like ? like : 0}
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default BlogCardFooter;
