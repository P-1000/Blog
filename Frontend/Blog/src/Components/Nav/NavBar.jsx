import React from 'react';
import { useSelector } from 'react-redux';


function NavBar() {
  const { currentUser } = useSelector(state => state.user);


  return (
    <div className='flex justify-between bg-blue-600 text-white p-6'>
      <div>
        <h1>NavBar</h1>
      </div>
      {currentUser ? (
        <div className='flex justify-around gap-10'>
          <a>Home</a>
          <a>Blog</a>
          <a className='cursor-pointer'
          >Profile</a>
          <a>LogOut</a>
          <a>{currentUser._id}</a>
        </div>
      ) : (
        <div className='flex justify-around gap-10'>
          <a>Home</a>
          <a>Blog</a>
          <a>Login</a>
        </div>
      )}
    </div>
  );
}

export default NavBar;