import React from 'react'
import {CiSearch} from 'react-icons/ci'
import {MdCreate} from 'react-icons/md'
import {RxAvatar} from 'react-icons/rx'
import {IoNotificationsOutline } from 'react-icons/io5'

function NavBar() {
  return (
    <div className='border-b-[1px] bg-white'>
    <div className='grid grid-cols-12 gap-[1rem] p-3 mx-4 '>
        <div className='col-span-3'>
            <img src='../Images/logo-standard.png' alt='logo' className='h-6 lg:h-8' />
        </div>
        <div className='flex col-span-6 gap-4'>
            <div>
                <button
                    className='border border-gray-300 rounded-full px-4 py-2 text-sm  
                    font-semibold text-gray-700 mr-2 hover:bg-gray-100'
                >Your Feed</button>
            </div>

            <div className="flex flex-row-reverse focus-within:border rounded-full px-4 py-2 pr-[16rem] 
             text-sm 
             focus-within:border-secondary">
             <input type="text"
              className="border-none focus:outline-none w-full text-primary"
                 placeholder="Search Flashpost"/>
            <div className="  h-full flex items-center pr-2">
                     <CiSearch className='text-xl text-gray-400' />
                </div>
            </div>


        </div>
        <div className='flex col-span-3 justify-around w-full'>
            <div>
                <button className=' w-full bg-primary rounded-full flex gap-2 px-4 py-2 text-sm
                    font-semibold text-secondary mr-2 hover:bg-gray-100'>
                        <MdCreate className='text-xl text-white' />
                    <p> Create</p>
                </button>
            </div>
            <div className='flex justify-between gap-7'>
                <button>
                <IoNotificationsOutline className='text-2xl text-gray-400' />
                </button>
                <button>
                <RxAvatar className='text-4xl text-gray-400' />
                </button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default NavBar
