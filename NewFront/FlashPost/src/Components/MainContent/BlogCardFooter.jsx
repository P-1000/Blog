import React from 'react'
import {BsBookmarkPlus} from 'react-icons/bs'
import {SlLike} from 'react-icons/sl'
import {Link} from 'react-router-dom'

function BlogCardFooter(props) {
  const {tag} = props
  return (
    <div className='flex justify-between mt-4'>
           <div>
      <div className='flex gap-8'>
        <div className='ml-5'>
            <BsBookmarkPlus className='text-2xl text-primary-500'/>
        </div>
        <div className='flex gap-[.2em]'>
          <Link to={`/search/${tag ? tag[0] : "Blog"}`}>
            <p className='border text-[.8rem] font-medium  rounded-full px-[14px] py-[1px]'>{tag ? tag[0] : "Blog"}</p>
            </Link>
            <Link to={`/search/${tag ? tag[1] : "FlashPost"}`}>
            <p className='border text-[.8rem] font-medium  rounded-full px-[14px] py-[1px]'>{tag ? tag[1] : "FlashPost"}</p>
            </Link>
            <p className='border text-[.8rem] font-medium  rounded-full px-[14px] py-[1px]'>8+</p>
        </div>
      </div>
      
    </div>

    <div>
        <div className='mx-10'>
            <button>
                <SlLike className='text-2xl text-primary-500'/>58
            </button>
        </div>
    </div>
    </div>
    
  )
}

export default BlogCardFooter
