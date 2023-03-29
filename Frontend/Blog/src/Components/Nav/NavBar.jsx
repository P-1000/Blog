import React from 'react'

function NavBar() {
  return (
    <div className='flex justify-between bg-blue-600 text-white p-6'>
      <div>
        <h1>NavBar</h1>
      </div>
      <div className='flex justify-around gap-10'>
        <a>Home</a>
        <a>Blog</a>
        <a>Profile</a>
        <a>LogOut</a>
        <a>Login</a>
        <a>UserName</a>
      </div>
    </div>
  )
}

export default NavBar
