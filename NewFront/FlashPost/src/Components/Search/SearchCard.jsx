import React from 'react'

function SearchCard(props) {
    const {imgUrl , title , desc , blog_id  , Author , time} = props
  return (
   <>
    <div>
      <div>
        {/* card header with author image and post title */}
              <div className='border-b-[1px] hover:bg-slate-200 transition-all'>

                    <div className='flex gap-5 '>
                    <div className='flex flex-col'>
                           <div className='mt-4 ml-5'>
                                <h1 className='text-2xl font-semibold text-primary'>
                                 {title}
                                </h1>
                                </div>

                             <div className='mt-2 ml-5 flex gap-10'>
                             <h1 className='text-xl  text-primary'>
                                    {Author}
                                </h1>
                                <p text-xl>
                                    14th Sep 2023
                                </p>
                             </div>  
                             <div className=' mt-3 ml-5 flex gap-4'>
                                <p className=''>
                                    5 min read
                                </p>
                                <p >90 interactions</p>
                                </div> 
                           </div>
                           <div>
                           <div className=' mx-4 w-64'>
                          
                <img src={imgUrl}
                className='rounded-md mt-[22px] w-full h-full border-primary shadow-lg hover:shadow-md transition-all' />
                </div>
                           </div>
                    </div>
            
              </div>
      </div>
    </div>
   </>
  )
}

export default SearchCard