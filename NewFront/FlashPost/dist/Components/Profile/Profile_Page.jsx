import React from 'react'
import Profile from './Profile'
import SideNav from '../SideBar/SideNav'

function Profile_Page() {
  return (
    <>
        <div className='flex'>
        <div>
          <SideNav/>
            </div>
            <div className='mr-5'>
                <Profile/>
                <div></div>
            </div>

            </div>
   </>
  )
}

export default Profile_Page