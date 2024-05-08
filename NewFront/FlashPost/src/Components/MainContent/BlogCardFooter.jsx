import React, { useEffect, useState } from 'react';
import { BsBookmarkPlus } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BiLike, BiSolidLike } from 'react-icons/bi';
import { motion } from 'framer-motion';

function BlogCardFooter(props) {
  const [countTag, setCountTag] = useState(0);
  const [like, setLike] = useState(props.like);
  const [likeLoading, setLikeLoading] = useState(false);

  const { tag } = props;

  const token = localStorage.getItem('jwt');
  const tok = JSON.parse(token);
  const config = {
    headers: { Authorization: `Bearer ${tok}` }
  };

  useEffect(() => {
    // Count tags
    setCountTag(tag ? tag.length : 0);
  }, [tag]); 

  const handleBookmarks = async () => {
    if (!token) {
      window.location.href = '/login';
      return;
    } else {
      try {
        // const response = await axios.put(
        //   `https://back-e0rl.onrender.com/api/blogs/bookmark/${props.id}`,
        //   null,
        //   config
        // );
        const response = await instance.put(`/api/blogs/bookmark/${props.id}`, null, config);
        console.log(response);
      } catch (error) {
        console.error('Error bookmarking blog:', error);
      }
    }
  };

  return (
    <div className='flex justify-between mt-4'>
      <div className='flex gap-4 mx-6 lg:gap-8'>
        <div className='flex gap-[.2em]'>
          {tag && tag.slice(0, 2).map((tagItem, index) => (
            <Link key={index} to={`/search/${tagItem}`}>
              <p className='border text-xs lg:text-sm font-medium rounded-full px-3 py-1'>
                {tagItem.length > 8 ? tagItem.slice(0, 10) + '...' : tagItem}
              </p>
            </Link>
          ))}
          <p className='border text-xs lg:text-sm font-medium rounded-full px-3 py-1'>
            {countTag > 2 ? countTag - 2 : 0}<span className='font-medium'>+</span>
          </p>
        </div>
      </div>
      <div className='flex gap-2 mx-10 items-center'>
        <div className=' hover:bg-blue-400/10 py-1 cursor-pointer px-2 rounded-full  text-sm lg:text-base font-normal'>
          {like ? like : 0} likes
        </div>
        <div className='font-normal hidden lg:block text-slate-400'>|</div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          whileDrag={{ scale: 0.9 }}
          onClick={handleBookmarks}
          className='hidden lg:block cursor-pointer'
        >
          <BsBookmarkPlus className='text-xl mt-[1px] text-primary-500' />
        </motion.div>
      </div>
    </div>
  );
}

export default BlogCardFooter;
