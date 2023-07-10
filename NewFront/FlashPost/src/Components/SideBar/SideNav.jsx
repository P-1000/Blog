import React from 'react'
import {MdOutlineExplore} from 'react-icons/md'
import TagsSide from './TagsSide'
import { useNavigate } from 'react-router-dom'

function SideNav() {
   const navigate = useNavigate()
   const handleExplore = () => {
      navigate('/')
   }
   const handleDrafts = () => {
      navigate('/Drafts')
   }
   const handleBookmarks = () => {
      navigate('/Bookmarks')
   }
   const handleAbout = () => {
      navigate('/About')
   }

  return (
    <div className='mt-3 p-5 mx-1 sticky top-[-1px] '>
        <div className='border rounded-md  bg-white   w-48 font-bold text-primary py-6'>

         <div className=' flex flex-col'>
         <a className='pb-3 p-2 cursor-pointer hover:bg-[#f5f5f5]'>
              <MdOutlineExplore className='inline-block mr-2 text-2xl '/>Explore
           </a>
           <a className='pb-3  p-2 cursor-pointer hover:bg-[#f5f5f5]'>
              <MdOutlineExplore className='inline-block mr-2 text-2xl'/>Drafts
           </a>
           <a 
           onClick={handleBookmarks}
           className='pb-3 p-2 cursor-pointer hover:bg-[#f5f5f5]'>
              <MdOutlineExplore className='inline-block mr-2 text-2xl'/>Bookmarks
           </a>
           <a className='pb-3  p-2 cursor-pointer hover:bg-[#f5f5f5]'>
              <MdOutlineExplore className='inline-block mr-2 text-2xl'/>About
           </a>
         </div>

    <div className='mt-6 px-4'>
        {/* divider line between explore and tags */}
        <div className='border-t-2  border-gray-200'></div>
    </div>
    
         <div className='mx-4'>
         <div>
              <h1 className='text-md font-bold text-primary mt-6'>Trending Tags</h1>
         </div>
           <TagsSide/>
           </div>

        </div>
     
    </div>
  )
}

export default SideNav
