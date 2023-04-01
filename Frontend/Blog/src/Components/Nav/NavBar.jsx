import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


import { useNavigate } from 'react-router-dom';

function NavBar() {
   const navigate = useNavigate();
   const { currentUser } = useSelector(state => state.user);
  
   const handleLogout = () => {
   localStorage.removeItem('jwt');
    navigate('/Go')
   }
   const handleLogin = () => {
    navigate('/Go')
   }

  return (
    <div className='flex justify-between bg-blue-600 text-white p-6'>
      <div>
        <h1>NavBar</h1>
      </div>
      {currentUser ? (
        <div className='flex justify-around gap-10'>
          <a
          className='cursor-pointer'
          onClick={() => navigate('/home')}
          >Home</a>
          <a>Blog</a>
          <a 
          onClick={() => navigate('/createBlog')}
          className='cursor-pointer'>New Post
          </a>
          <a
          className='cursor-pointer'
          onClick={handleLogout}
          >LogOut</a>
          <a>{currentUser.name}</a>
        </div>
      ) : (
        <div  className='flex justify-around gap-10'>
          <a
          className='cursor-pointer'
          onClick={() => navigate('/home')}
          >Home</a>
          <a>Blog</a>
          <a
          className='cursor-pointer'
          onClick={handleLogin}
          >Login</a>
        </div>
      )}
    </div>
  );
}

export default NavBar;