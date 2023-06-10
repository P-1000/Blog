import React, { useEffect, useState } from 'react';
import { BsBookmarkPlus } from 'react-icons/bs';
import { SlLike } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import axios from 'axios';

function BlogCardFooter(props) {
  const [like, setLike] = useState(props.like);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    console.log(like);
  }, []); // Empty dependency array ensures the effect runs only once when component mounts

  async function handleLike() {
    if (isLiked) {
      setLike(like - 1);
      const response = await axios.put(`http://localhost:3000/api/blogs/dislike/${props.id}`);
      setIsLiked(false);
      console.log(response);
    } else {
      setLike(like + 1);
      setIsLiked(true);
      const response = await axios.put(`http://localhost:3000/api/blogs/like/${props.id}`);
      console.log(response);
    }
  }

  const { tag } = props;

  return (
    <div className='flex justify-between mt-4'>
      <div>
        <div className='flex gap-8'>
          <div className='ml-5'>
            <BsBookmarkPlus className='text-2xl text-primary-500' />
          </div>
          <div className='flex gap-[.2em]'>
            <Link to={`/search/${tag ? tag[0] : 'Blog'}`}>
              <p className='border text-[.8rem] font-medium rounded-full px-[14px] py-[1px]'>
                {tag ? tag[0] : 'Blog'}
              </p>
            </Link>
            <Link to={`/search/${tag ? tag[1] : 'FlashPost'}`}>
              <p className='border text-[.8rem] font-medium rounded-full px-[14px] py-[1px]'>
                {tag ? tag[1] : 'FlashPost'}
              </p>
            </Link>
            <p className='border text-[.8rem] font-medium rounded-full px-[14px] py-[1px]'>8+</p>
          </div>
        </div>
      </div>

      <div>
        <div className='mx-10'>
          <button>
            <SlLike onClick={handleLike} className='text-2xl text-primary-500' />
            {like}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogCardFooter;
