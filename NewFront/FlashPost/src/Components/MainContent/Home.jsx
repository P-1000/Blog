import React from 'react'
import SideNav from '../SideBar/SideNav'
import MainContent from './MainContent'
import RightMenu from '../SideBar/RightMenu'

function Home() {
  return (
    <>
    <div className='flex'>
      <div>
      <SideNav/>
      </div>
      <div>
      <MainContent/>
      </div>
       <div className='sticky '>
       <RightMenu/>
       </div>
    </div>
    </>
  )
}

export default Home