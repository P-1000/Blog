import React, { useEffect , useState } from 'react'
import SideNav from '../SideBar/SideNav'
import Book from './Book'
import { useNavigate } from 'react-router-dom'


function Bookmark() {
   
    
  return (
    <>
        <div className='flex'>
        <SideNav/>
        <div className='flex flex-col gap-0'>
            <h1  className='
            text-3xl font-bold text-primary  mb-1 border-neutral-400 shadow-inner  text-center bg-white z-50 mt-8 rounded-md p-4 px-6 mr-1 '>
            Bookmarks</h1>
            <div>
                <Book/>
            </div>
        </div>
        </div>

    </>
  )
}

export default Bookmark