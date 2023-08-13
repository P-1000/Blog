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

  useEffect(() => {
    const checkIsLiked = async () => {
      try {
        const response = await axios.get(
          `https://back-e0rl.onrender.com/api/blogs/isliked/${props.id}`,
          config
        );
        setIsLiked(response.data.isLiked);
      } catch (error) {
        console.error('Error checking if blog is liked:', error);
      }
    };
    checkIsLiked();
  }, [props.id, config]);

  async function handleLike() {
    if (!token) {
      window.location.href = '/login';
      return;
    }

    try {
      if (isLiked) {
        setLike(like - 1);
        await axios.put(
          `https://back-e0rl.onrender.com/api/blogs/unlike/${props.id}`,
          null,
          config
        );
        setIsLiked(false);
      } else {
        setLike(like + 1);
        await axios.put(
          `https://back-e0rl.onrender.com/api/blogs/like/${props.id}`,
          null,
          config
        );
        setIsLiked(true);
      }
    } catch (error) {
      console.error('Error handling like:', error);
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
          <div
            onClick={handleBookmarks}
            className='ml-5 hidden lg:block'
          >
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
              <span className='font-medium'>+</span>
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className='mx-10'>
          <button className='flex lg:block gap-1 flex-row-reverse'>
            <SlLike
              onClick={handleLike}
              className={`lg:text-2xl text-xl text-primary-500 ${
                isLiked ? 'text-red-500' : ''
              }`}
            />
            {like ? like : 0}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogCardFooter;
