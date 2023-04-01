import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// other imports : 
import { BrowserRouter as Router, Route, Routes ,  } from "react-router-dom";
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Test from './Components/TEST/Test';
import Enter from './Components/Auth/Enter';
import NavBar from './Components/Nav/NavBar';
import Home from './Components/Home/Home';
import HC from './Components/HOme/HC';
import CreateBlog from './Components/Blog_Cards/CreateBlog';
import BlogDetails from './Components/Blog_Cards/BlogDetails';
import EditBlog from './Components/Blog_Cards/EditBlog';

function App() {

 
  
  

  const [count, setCount] = useState(0)

  return (
    <>

 <Router>
 <NavBar/>
 <Routes>
        <Route path='/' element={<Test/>} />
    </Routes>
    <Routes>
        <Route path='/Go' element={<Enter/>} /> 
    </Routes>
    <Routes>
        <Route path='/createBlog' element={<CreateBlog/>} />
    </Routes>
    <Routes>
        <Route path='/updateBlog/:Blog_id' element={<EditBlog/>} />
    </Routes>
    <Routes>
        <Route path='/BlogDetails/:id' element={<BlogDetails/>} />
    </Routes>
    <Routes>
        <Route path='/Login' element={<Login />} />
    </Routes>
    <Routes>
        <Route path='/Register' element={<Register/>} />
    </Routes>
    <Routes>
        <Route path='/home' element={<HC/>} />
    </Routes>
 </Router>
</>
  )
}

export default App