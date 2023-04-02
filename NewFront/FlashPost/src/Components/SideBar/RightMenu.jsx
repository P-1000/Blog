import React from 'react'
import {SlLike} from 'react-icons/sl'
import {TfiCommentAlt} from 'react-icons/tfi'
import DraftsSide from './DraftsSide'

function RightMenu() {
  return (
    <div>
     <div className='mt-3 p-5 mx-1'>
     <div className='border rounded-md  bg-white   w-full font-bold text-primary py-6'>
     <h1 className='mx-4 border-b'>Recently Viewed</h1>
     <div className='border-b-[1px] '>
        <div>
            <div className='flex gap-[.4em] mx-4 mt-2'>
            <img src='https://pbs.twimg.com/media/Cf9OWYmWEAILJ6b.jpg'
            className='w-10 h-10 rounded-full object-cover'/>
            <div className='ml-2'>
                <h1 className='text-sm font-medium'>Why persisting incremental user states is hard</h1>
                <div className='mt-1'>
                <h1 className='text-sm text-slate-500 font-normal'>@Hinata_Hyuga</h1>
            </div>
            <div className='flex gap-3 mb-3'>
                <button className='bg-[#f5f5f5] text-[#0a0a0a] text-xs font-medium px-2 py-1 rounded-md mt-2'>
                    <SlLike className='inline-block mr-1'/>289
                </button>
                <button className='bg-[#f5f5f5] text-[#0a0a0a] text-xs font-medium px-2 py-1 rounded-md mt-2'>
                    <TfiCommentAlt className='inline-block mr-1'/>87
                </button>
            </div>
                </div>
            </div>
          
        </div>
     </div>

     {/* card 2 */}

     <div className='border-b-[1px] '>
        <div>
            <div className='flex gap-[.4em] mx-4 mt-2'>
            <img src='https://pbs.twimg.com/media/Cf9OWYmWEAILJ6b.jpg'
            className='w-10 h-10 rounded-full object-cover'/>
            <div className='ml-2'>
                <h1 className='text-sm font-medium'>Why persisting incremental user states is hard</h1>
                <div className='mt-1'>
                <h1 className='text-sm text-slate-500 font-normal'>@Hinata_Hyuga</h1>
            </div>
            <div className='flex gap-3 mb-3'>
                <button className='bg-[#f5f5f5] text-[#0a0a0a] text-xs font-medium px-2 py-1 rounded-md mt-2'>
                    <SlLike className='inline-block mr-1'/>289
                </button>
                <button className='bg-[#f5f5f5] text-[#0a0a0a] text-xs font-medium px-2 py-1 rounded-md mt-2'>
                    <TfiCommentAlt className='inline-block mr-1'/>87
                </button>
            </div>
                </div>
            </div>
          
        </div>
     </div>
     {/* card 3 */}
     <div className=' '>
        <div>
            <div className='flex gap-[.4em] mx-4 mt-2'>
            <img src='https://pbs.twimg.com/media/Cf9OWYmWEAILJ6b.jpg'
            className='w-10 h-10 rounded-full object-cover'/>
            <div className='ml-2'>
                <h1 className='text-sm font-medium'>Why persisting incremental user states is hard</h1>
                <div className='mt-1'>
                <h1 className='text-sm text-slate-500 font-normal'>@Hinata_Hyuga</h1>
            </div>
            <div className='flex gap-3 mb-3'>
                <button className='bg-[#f5f5f5] text-[#0a0a0a] text-xs font-medium px-2 py-1 rounded-md mt-2'>
                    <SlLike className='inline-block mr-1'/>289
                </button>
                <button className='bg-[#f5f5f5] text-[#0a0a0a] text-xs font-medium px-2 py-1 rounded-md mt-2'>
                    <TfiCommentAlt className='inline-block mr-1'/>87
                </button>
            </div>
                </div>
            </div>
          
        </div>
     </div>

     
     </div>
     </div>
     <div>
        <DraftsSide/>
     </div>
    </div>
  )
}

export default RightMenu
