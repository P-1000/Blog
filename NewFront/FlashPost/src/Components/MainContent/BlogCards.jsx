import React from 'react'
import ReactQuill from 'react-quill';
import { useState , useEffect } from 'react';

function BlogCards(props) {
  const {imgUrl , title , desc , blog_id  , Author , time} = props
  const [s , sc]  = useState('')
  const [coverImg , setcoverImg] = useState({})
  //base64 to image : 
  // Base64-encoded image data
//const base64Image = 'data:image/jpeg;base64,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';
const base64Image = imgUrl
// Decode the image data
const decodedImage = atob(base64Image.split(',')[1]);

// Create a Uint8Array buffer from the decoded image data
const buffer = new Uint8Array(decodedImage.length);
for (let i = 0; i < decodedImage.length; ++i) {
  buffer[i] = decodedImage.charCodeAt(i);
}

// Create a Blob object from the buffer
const blob = new Blob([buffer], { type: 'image/jpeg' || 'image/png' });

// Create a URL object from the blob
const url = URL.createObjectURL(blob);

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
                    <img src='https://pbs.twimg.com/media/FlcOGr8WAAEsCHG.jpg:large' className='rounded-full h-10 w-10' />
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
                                <h1 className='text-xl font-bold text-primary'>
                               {title}
                                </h1>
                                </div>

                             <div>
                             <div className='w-[27rem] mt-1'>
                                <p className='text-sm text-gray-500 ml-5 font-normal' 
                                dangerouslySetInnerHTML={{__html:desc}} //html parse of quill
                                >

                                    </p>
                                </div>
                             </div>   
                           </div>
                           <div>
                           <div className=' mx-4'>
                          
                <img src={url}
                className='rounded-md  w-full border-primary border-[1.5px]' />
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
