import React from 'react';
import { ImMagicWand } from 'react-icons/im';
import { AiOutlineStar } from 'react-icons/ai';
import { HiTrendingUp } from 'react-icons/hi';
import { BiTimeFive } from 'react-icons/bi';
import { motion } from 'framer-motion';

function ContentMenu({ category, onCategoryChange }) {

    const changeCategory = (category) => {
        // Invoke the `onCategoryChange` function passed as a prop
        onCategoryChange(category); // this function is defined in MainContent.jsx and passed as a prop to ContentMenu.jsx 
      };
      

  return (
    <div className='border-b-[1px] w-full'>
      <div>
        <div className='flex justify-between mx-12'>
          <div className='flex lg:gap-6 gap-24'>
            <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            whileDrag={{ scale: 0.9 }}
              onClick={() => changeCategory('personalised')}
              className='flex items-center gap-2 mb-2'
            >
              <ImMagicWand className='text-[20px]' />
              <motion.p 
              
              className={category === 'personalised' ? 'text-md text-primary hover:text-secondary' : 'text-sm text-gray-500'}>
                Personalised
              </motion.p>
            </motion.div>

            <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            whileDrag={{ scale: 0.9 }}
              onClick={() => changeCategory('trending')}
              className='flex items-center mb-2 gap-2'
            >
              <AiOutlineStar className='text-[20px]' />
              <p className={category === 'trending' ? 'text-md text-primary hover:text-secondary transition-transform' : 'text-sm text-gray-500'}>
                Trending
              </p>
            </motion.div>

            <motion.div
           
            whileTap={{ scale: 0.9 }}
         
              onClick={() => changeCategory('mostRecent')}
              className=' items-center mb-2 gap-2 hidden lg:flex'
            >
              <BiTimeFive className='text-[12px]' />
              <p className={category === 'mostRecent' ? 'text-md text-primary hover:text-secondary' : 'text-sm text-gray-500'}>
                Most Recent
              </p>
            </motion.div>

            <motion.div
            whileTap={{ scale: 0.9 }}
        
              onClick={() => changeCategory('sort')}
              className='lg:flex hidden items-center mb-2 gap-2'
            >
              <HiTrendingUp className='text-[12px]' />
              <p className={category === 'sort' ? 'text-md text-primary hover:text-secondary' : 'text-sm text-gray-500'}>
                Sort by
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentMenu;
