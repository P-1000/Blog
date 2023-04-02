import React from 'react'
import BlogCardFooter from './BlogCardFooter'
import BlogCards from './BlogCards'
import ContentMenu from './ContentMenu'

function MainContent() {
  return (
  <div className=''>
    <div className='mt-3  pt-5'>
    <div className='border rounded-md  bg-white   w-full font-bold text-primary py-6 '>
        <div className=''>
        <ContentMenu/>
        </div>
        <div>
  <div>
            <BlogCards/>
        </div>
        <div className='mb-3'>
            <BlogCardFooter/>
        </div>
        </div>
           <div className='border-t-[1px]'>
  <div>
            <BlogCards/>
        </div>
        <div>
            <BlogCardFooter/>
        </div>
        </div>

        <div className='border-t-[1px]'>
  <div>
            <BlogCards/>
        </div>
        <div>
            <BlogCardFooter/>
        </div>
        </div>


        <div className='border-t-[1px]'>
  <div>
            <BlogCards/>
        </div>
        <div>
            <BlogCardFooter/>
        </div>
        </div>

        <div className='border-t-[1px]'>
  <div>
            <BlogCards/>
        </div>
        <div>
            <BlogCardFooter/>
        </div>
        </div>


        <div className='border-t-[1px]'>
  <div>
            <BlogCards/>
        </div>
        <div>
            <BlogCardFooter/>
        </div>
        </div>

        <div className='border-t-[1px]'>
  <div>
            <BlogCards/>
        </div>
        <div>
            <BlogCardFooter/>
        </div>
        </div>

        <div className='border-t-[1px]'>
  <div>
            <BlogCards/>
        </div>
        <div>
            <BlogCardFooter/>
        </div>
        </div>  <div className='border-t-[1px]'>
  <div>
            <BlogCards/>
        </div>
        <div>
            <BlogCardFooter/>
        </div>
        </div>
        
    </div>

    
    </div>
  </div>
  )
}

export default MainContent
