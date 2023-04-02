import React from 'react'

function BlogCards() {
  return (
    <div>
      <div>
        {/* card header with author image and post title */}
              <div>
                <div className='flex gap-4'>    
                    <div className='ml-5 mt-4'>
                    <img src='https://pbs.twimg.com/media/FlcOGr8WAAEsCHG.jpg:large' className='rounded-full h-10 w-10' />
                        </div>
                        <div className='mt-4'>
                            <div>
                            <h1 className='text-md font-bold text-primary'>Pavan Patchikarla</h1>
                            <p className='text-xs text-gray-500'>2 hours ago</p>
                            </div>
                            <div>
                            </div>
                            </div>
                            </div>
                    <div className='flex gap-5 '>
                    <div className='flex flex-col'>
                           <div className='mt-4 ml-5'>
                                <h1 className='text-xl font-bold text-primary'>
                                5G Technology: What You Need to Know
                                </h1>
                                </div>

                             <div>
                             <div className='w-[27rem] mt-1'>
                                <p className='text-sm text-gray-500 ml-5 font-normal'>
                                            5G technology is the next generation of mobile internet connectivity, promising faster data speeds, lower latency, and increased capacity. This technology enables faster download and upload speeds, improved connectivity, and more reliable connections on smartphones, tablets, and other devices. With the advent of 5G, users can
                                    </p>
                                </div>
                             </div>   
                           </div>
                           <div>
                           <div className=' mx-4'>
                <img src='https://cdn.hashnode.com/res/hashnode/image/stock/unsplash/y67dwfB2AiM/upload/7e8c99ef5276ff492c092eda0312240c.jpeg?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp' 
                className='rounded-md h-36 w-full border-primary border-[1.5px]' />

                </div>
                           </div>
                    </div>
                                
              </div>
                {/* card body with post image and post description */}
                <div className='mt-1'>
             <div className='flex'>
             <div className='w-6/12'>
                       
                </div>
             
             </div>
                    </div>
      </div>
    </div>
  )
}

export default BlogCards
