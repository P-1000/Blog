import React from 'react'
import BasicPopover from './BasicPopover'
import { Link } from 'react-router-dom'

function Author(props) {
  const {name} = props
  const post_id = props.post_id
  return (
    <div className='w-8/12 mx-20 pt-10 flex justify-between'>
      {/* link to profile page  */}
      <Link to={`/profile/@${name}`}>
      <div className='flex'>
        <div className='flex gap-5 '>
           <div>
           <img 
            className='w-12 h-12 rounded-full'
            src='https://i.scdn.co/image/ab67616d0000b273dc70b075d2db0dc27729fa6b' />
           </div>
           <div className='mt-[4px]'>
            <h1 className='text-sm font-medium'>{name}</h1>
            <h2 className='text-[13px] font-light'>Mar 28</h2>
           </div>
        </div>
        </div>
        </Link>

        <div className='flex justify-between gap-10 w-2/12 float-right'>
        <div className='flex w-6 h-6 p-1  gap-2 mt-2'>
        <img src='https://cdn-icons-png.flaticon.com/512/3128/3128208.png'/>
            <img src='https://cdn-icons-png.flaticon.com/512/61/61109.png'/>
            <img src='https://cdn-icons-png.flaticon.com/512/25/25347.png'/>
            <img src='https://cdn-icons-png.flaticon.com/512/455/455691.png'/>
            <img src='https://cdn-icons-png.flaticon.com/512/7966/7966414.png'/>
        </div>
        <div className='flex w-7 h-7 p-1 gap-2'>
            <BasicPopover post_id={post_id}/>
        </div>
        </div>
        <div>

        </div>
    </div>
  )
}

export default Author