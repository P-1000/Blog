import { useState } from 'react'
import './App.css'
import MainContent from './Components/MainContent/MainContent'
import NavBar from './Components/Nav/NavBar'
import RightMenu from './Components/SideBar/RightMenu'
import SideNav from './Components/SideBar/SideNav';
import { BrowserRouter as Router, Route, Routes ,  } from "react-router-dom";
import CreatePost from './Components/BlogCreation/CreatePost'
import Home from './Components/MainContent/Home'
import Auth from './Components/auth/Auth'
import BlogDetails from './Components/MainContent/BlogDetails'

function App() {


  return (
    <>
     
    <Router>
    <NavBar/>
    <Routes>
        <Route path='/' element={<Auth/>} />
    </Routes>
    <Routes>
        <Route path='/home' element={<Home/>} />
    </Routes>
    <Routes>
        <Route path='blog/:AuthorId/:blogId' element={<BlogDetails/>} />
    </Routes>
    <Routes>
        <Route path='/Write' element={<CreatePost/>} />
    </Routes>
    </Router>
    </>
  )
}

export default App
