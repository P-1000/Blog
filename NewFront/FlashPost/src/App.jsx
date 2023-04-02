import { useState } from 'react'
import './App.css'
import MainContent from './Components/MainContent/MainContent'
import NavBar from './Components/Nav/NavBar'
import RightMenu from './Components/SideBar/RightMenu'
import SideNav from './Components/SideBar/SideNav';
import { BrowserRouter as Router, Route, Routes ,  } from "react-router-dom";
import CreatePost from './Components/BlogCreation/CreatePost'

function App() {


  return (
    <>
    <div className="App">
    <NavBar/>
   <div className='flex '>
   <SideNav/>
    <MainContent/>
    <RightMenu/>
   </div>
   <CreatePost/>
    </div>
    </>
  )
}

export default App
