import React from 'react'
import {AiOutlineDoubleRight} from 'react-icons/ai'

function TagsSide() {
  return (
    <div className='mt-4'>
       <div>
       <div className='flex justify-between mb-[7px]'>
            <a className='text-sm text-gray-500 hover:text-secondary'>#javascript</a>
            <p className='border rounded-full px-[6px] py-[2px] text-[10px] mt-[1px]'>+545</p>
        </div>
        <div className='flex justify-between mb-[7px]'>
            <a className='text-sm text-gray-500 hover:text-secondary'>#react</a>
            <p className='border rounded-full px-[6px] py-[2px] text-[10px] mt-[1px]'>+461</p>
        </div>
        <div className='flex justify-between mb-[7px]'>
            <a className='text-sm text-gray-500 hover:text-secondary'>#node</a>
            <p className='border rounded-full px-[6px] py-[2px] text-[10px] mt-[1px]'>+448</p>
        </div>
        <div className='flex justify-between mb-[7px]'>
            <a className='text-sm text-gray-500 hover:text-secondary'>#express</a>
            <p className='border rounded-full px-[6px] py-[2px] text-[10px] mt-[1px]'>+410</p>
        </div>
        <div className='flex justify-between mb-[7px]'>
            <a className='text-sm text-gray-500 hover:text-secondary'>#mongodb</a>
            <p className='border rounded-full px-[6px] py-[2px] text-[10px] mt-[1px]'>+345</p>
        </div>
        <div className='flex justify-between mb-[7px]'>
            <a className='text-sm text-gray-500 hover:text-secondary'>#css</a>
            <p className='border rounded-full px-[6px] py-[2px] text-[10px] mt-[1px]'>+315</p>
        </div>
        <div className='flex justify-between mb-[7px]'>
            <a className='text-sm text-gray-500 hover:text-secondary'>#Linux</a>
            <p className='border rounded-full px-[6px] py-[2px] text-[10px] mt-[1px]'>+305</p>
            </div>
        <div className='flex justify-between mb-[7px]'>
            <a className='text-sm text-gray-500 hover:text-secondary'>#DevOps</a>
            <p className='border rounded-full px-[6px] py-[2px] text-[10px] mt-[1px]'>+295</p>
            </div>
       </div>

       <div className='text-sm'>
              <a className='text-primary hover:text-secondary mt-[30px]'>Show More </a>
                <AiOutlineDoubleRight className='inline-block text-[10px]'/>
       </div>

    </div>
  )
}

export default TagsSide
