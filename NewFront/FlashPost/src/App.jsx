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
import EditPost from './Components/MainContent/EditPost'
import SearchRes from './Components/Search/SearchRes'
import Profile from './Components/Profile/Profile'
import Profile_Page from './Components/Profile/Profile_Page'
import Bookmark from './Components/Bookmarks/Bookmark'
import Register from './Components/auth/Register'

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
        <Route path='/signup' element={<Register/>} />
    </Routes>
    <Routes>
        <Route path='/search/:query' element={<SearchRes/>} />
    </Routes> 
    <Routes>
        <Route path='blog/:AuthorId/:blogId' element={<BlogDetails/>} />
    </Routes>
    <Routes>
        <Route path='Profile/:User' element={<Profile_Page/>} />
    </Routes>
    <Routes>
        <Route path='blog/:User' element={<Profile_Page/>} />
    </Routes>
    <Routes>
        <Route path='Edit/:blogId' element={<EditPost/>} />
    </Routes>
    <Routes>
        <Route path='/Bookmarks' element={<Bookmark/>} />
    </Routes>  
    <Routes>
        <Route path='/Write' element={<CreatePost/>} />
    </Routes>
    </Router>
    </>
  )
}

export default App
