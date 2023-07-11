import React from 'react'
import SideNav from '../SideBar/SideNav'
import MainContent from './MainContent'
import RightMenu from '../SideBar/RightMenu'

function Home() {
  return (
    <>
    <div className='flex w-full gap-0'>
      <div className='hidden lg:block'>
      <SideNav/>
      </div>
      <div className=''>
      <MainContent/>
      </div>
       <div className='sticky top-[1rem] hidden lg:block'>
       <RightMenu/>
       </div>
    </div>
    </>
  )
}

export default Home