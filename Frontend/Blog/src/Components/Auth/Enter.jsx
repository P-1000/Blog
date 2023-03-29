import React from 'react'
import Login from './Login'
import Register from './Register'

function Enter() {
  return (
    <div>
    <div className='mx-4 p-10'>
    <Login/>
    </div>
 <div className='mx-4 p-10'>
 <Register/>
 </div>
    </div>
  )
}

export default Enter
