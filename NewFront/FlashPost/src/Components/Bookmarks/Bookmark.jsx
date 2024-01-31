import React, { useEffect , useState } from 'react'
import SideNav from '../SideBar/SideNav'
import Book from './Book'
import { useNavigate } from 'react-router-dom'


function Bookmark() {
   
    
  return (
    <>
        <div className='flex'>
        <SideNav/>
        <div className='flex flex-col gap-0 content-center'>
            <h1  className='
            text-3xl font-bold text-primary  mx-3  mb-3 border-neutral-400 shadow-inner  text-center bg-white z-50 mt-8 rounded-xl p-4  mr-1 '>
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