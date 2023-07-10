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
            <h1 className='text-3xl font-bold text-primary mt-6 mb-1'>Bookmarks</h1>
            <div>
                <Book/>
            </div>
        </div>
        </div>

    </>
  )
}

export default Bookmark