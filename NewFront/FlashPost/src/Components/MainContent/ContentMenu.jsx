import React from 'react'
import {ImMagicWand} from 'react-icons/im'
import {AiOutlineStar} from 'react-icons/ai'
import {HiTrendingUp} from 'react-icons/hi'
import {BiTimeFive} from 'react-icons/bi'

function ContentMenu() {
  return (
            <div className=' border-b-[1px]'>
               <div>
                     <div className='flex justify-between mx-5'>
                        <div className='flex gap-6'>
                            <div className='flex items-center gap-2 mb-2'>
                                <ImMagicWand className='text-[20px]'/> 
                                <p className='text-sm text-primary hover:text-secondary '> Personalised</p>
                                </div>

                            <div className='flex items-center mb-2 gap-2'>
                                <AiOutlineStar className='text-[20px]'/> 
                                <p className='text-sm text-gray-500'>Sort By</p>
                                </div>
                               
                                <div className='flex items-center mb-2 gap-2'>
                                    <BiTimeFive className='text-[20px]'/>
                                    <p className='text-sm text-gray-500'>Most Recent</p>
                                    </div>
                                <div className='flex items-center mb-2 gap-2'>
                                    <HiTrendingUp className='text-[20px]'/>
                                    <p className='text-sm text-gray-500'>Most Popular</p>
                                    </div>
                                    </div>
                        </div>
               </div>
            </div>
  )
}

export default ContentMenu
