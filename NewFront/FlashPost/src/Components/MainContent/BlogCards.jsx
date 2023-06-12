import React from 'react'
import ReactQuill from 'react-quill';
import { useState , useEffect } from 'react';
import AuthoImg from './AuthoImg';

function BlogCards(props) {
  const {imgUrl , title , desc , blog_id  , Author , time} = props
  const [s , sc]  = useState('')
  const [coverImg , setcoverImg] = useState({})
// Use the URL to display the image
const img = new Image();

const date = new Date(time);
const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'Asia/Kolkata' };
const formattedDate = date.toLocaleString('en-IN', options);

  return (
    <div>
      <div>
        {/* card header with author image and post title */}
              <div>
                <div className='flex gap-4'>    
                    <div className='ml-5 mt-4'>
                    <AuthoImg author_name={Author} />
                        </div>
                        <div className='mt-4'>
                            <div>
                            <h1 className='text-md font-bold text-primary'>{Author}</h1>
                            <p className='text-xs text-gray-500'>{formattedDate}</p>
                            </div>
                            <div>
                            </div>
                            </div>
                            </div>
                    <div className='flex gap-5 '>
                    <div className='flex flex-col'>
                           <div className='mt-4 ml-5'>
                                <h1 className='text-xl font-bold text-primary hover:text-secondary '>
                               {title}
                                </h1>
                                </div>

                             <div>
                             <div className='w-[27rem]  mt-1'>
                                {/* <p className='text-sm text-gray-500 ml-5 font-normal text-ellipsis  overflow-hidden ' 
                                dangerouslySetInnerHTML={{__html:desc}} > */}
                                <p className='text-sm text-gray-500 ml-5 font-normal h-24 text-ellipsis overflow-hidden '>
                                {desc}
                                    </p>
                                </div>
                             </div>   
                           </div>
                           <div>
                           <div className=' mx-4'>
                          
                <img src={imgUrl}
                className='rounded-md  w-full border-primary shadow-lg hover:shadow-md transition-all' />
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
