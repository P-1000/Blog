import React from 'react'
import SideNav from '../SideBar/SideNav'
import MainContent from './MainContent'
import RightMenu from '../SideBar/RightMenu'

function Home() {
  return (
    <>
    <div className='flex'>
        <SideNav/>
        <MainContent/>
        <RightMenu/>
    </div>
    </>
  )
}

export default Home