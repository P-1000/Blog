import React from 'react'
import {ImMagicWand} from 'react-icons/im'
import {AiOutlineStar} from 'react-icons/ai'
import {HiTrendingUp} from 'react-icons/hi'
import {BiTimeFive} from 'react-icons/bi'
import { useState , useEffect } from 'react'

function ContentMenu() {

    // set the state for the category
    const [category, setCategory] = useState('personalised');

    // change the category
    const changeCategory = (category) => {
        setCategory(category);
    }


  return (
            <div className=' border-b-[1px]'>
               <div>
                     <div className='flex justify-between mx-5'>
                        <div className='flex gap-6'>
                            <div 
                            onClick={()=>changeCategory('personalised')}
                            className='flex items-center gap-2 mb-2'>
                                <ImMagicWand className='text-[20px]'/> 
                                <p className={category === 'personalised' ? 'text-md text-primary hover:text-secondary' : 'text-sm text-gray-500'}>
                                     Personalised</p>
                                </div>

                            <div 
                            onClick={()=>changeCategory('trending')}
                            className='flex items-center mb-2 gap-2'>
                                <AiOutlineStar className='text-[20px]'/> 
                                <p className={category === 'trending' ? 'text-md text-primary hover:text-secondary transition-transform' : 'text-sm text-gray-500'}
                                >Trending</p>
                                </div>
                               
                                <div 
                                onClick={()=>changeCategory('mostRecent')}
                                className='flex items-center mb-2 gap-2'>
                                    <BiTimeFive className='text-[20px]'/>
                                    <p className={category === 'mostRecent' ? 'text-md text-primary hover:text-secondary' : 'text-sm text-gray-500'}
                                    >Most Recent</p>
                                    </div>

                                <div 
                                onClick={()=>changeCategory('sort')}
                                className='flex items-center mb-2 gap-2'>
                                    <HiTrendingUp className='text-[20px]'/>
                                    <p className={category === 'sort' ? 'text-md text-primary hover:text-secondary' : 'text-sm text-gray-500'}
                                    >Sort by</p>
                                    </div>
                                    </div>
                        </div>
               </div>
            </div>
  )
}

export default ContentMenu
