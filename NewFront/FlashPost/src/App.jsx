import { useState } from 'react'
import './App.css'
import MainContent from './Components/MainContent/MainContent'
import NavBar from './Components/Nav/NavBar'
import RightMenu from './Components/SideBar/RightMenu'
import SideNav from './Components/SideBar/SideNav'

function App() {


  return (
    <div className="App">
    <NavBar/>
   <div className='flex '>
   <SideNav/>
    <MainContent/>
    <RightMenu/>
   </div>
    </div>
  )
}

export default App
