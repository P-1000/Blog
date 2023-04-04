import React from 'react'
import Author from './Author'

function BlogDetails() {
  return (
   <>
   <div className='det w-full h-[100vh]  rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40 '>
    <div>
        {/* author details  */}
        <Author/>
    </div>

    <div>
    <div> 
       <h1 className=''>12 TypeScript tricks for Clean Code</h1>
    </div>
    <div>
      <p>We’ll explore twelve TypeScript tricks for writing clean code, with examples that demonstrate how they work and why they are useful. By using these tricks in your own TypeScript code, you can create more robust and maintainable applications that are easier to reason about and debug.</p>
    </div>
    </div>

   </div>
    

   </>
  )
}

export default BlogDetails