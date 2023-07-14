import React, { useEffect, useState } from 'react';
import { BsBookmarkPlus } from 'react-icons/bs';
import { SlLike } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import axios from 'axios';

function BlogCardFooter(props) {
  const [countTag, setCountTag] = useState(0);
  const [like, setLike] = useState(props.like);
  const [isLiked, setIsLiked] = useState(false);

  const { tag } = props;


  useEffect(() => {

    tag.map((tag) => {
      setCountTag((prev)=>prev+1)
    });
  }, []); // Empty dependency array ensures the effect runs only once when component mounts

  async function handleLike() {

    //check if the user is logged in or not if! logged in redirect to login page
    if (!localStorage.getItem('jwt')) {
    return   window.location.href = '/login';
    }

    if (isLiked) {
      setLike(like - 1);
      const response = await axios.put(`https://back-e0rl.onrender.com/api/blogs/dislike/${props.id}`);
      setIsLiked(false);
      console.log(response);
    } else {
      setLike(like + 1);
      setIsLiked(true);
      const response = await axios.put(`https://back-e0rl.onrender.com/api/blogs/like/${props.id}`);
      console.log(response);
    }
  }


  return (
    <div className='flex justify-between mt-4'>
      <div>
        <div className='flex gap-4 lg:gap-8'>
          <div className='ml-5 hidden lg:block'>
            <BsBookmarkPlus className='text-2xl text-primary-500' />
          </div>
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
              <span className='font-medium'>
                +
              </span>
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className='mx-10'>
          <button className='flex lg:block gap-1 flex-row-reverse'>
            <SlLike onClick={handleLike} className='lg:text-2xl text-xl text-primary-500' />
            {like}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogCardFooter;
