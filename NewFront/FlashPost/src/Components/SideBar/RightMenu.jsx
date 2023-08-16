import React from 'react'
import {SlLike} from 'react-icons/sl'
import {TfiCommentAlt} from 'react-icons/tfi'
import DraftsSide from './DraftsSide'
import axios from 'axios'
import { useState , useEffect } from 'react'

function RightMenu() {

    const [trends, setTrends] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchTrends = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`https://back-e0rl.onrender.com/api/blogs/trending`);
                setTrends(res.data?.slice(0,3))
                console.log(trends)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setError(true)
                setLoading(false)
            }
        }
        fetchTrends()
    }, [])


  return (
    <div className='sticky top-[-1px]'>
     <div className='mt-3 p-5 mx-1 '>
     <div className='border rounded-md  bg-white   w-full font-bold text-primary py-6'>
     <h1 className='mx-4 border-b'>Trending Articles</h1>
     <div className='border-b-[1px] '>
       { trends && trends.map((trend) => (
        <div>
            <div className='flex gap-[.4em] mx-4 mt-2'>
            <img src={trend?.imgUrl}
            className='w-10 h-10 rounded-full border object-cover'/>
            <div className='ml-2'>
                <h1 className='text-sm font-medium'>{trend?.title}</h1>
                <div className='mt-1'>
                <h1 className='text-sm text-slate-500 font-normal'>@{trend?.Author}</h1>
            </div>
            <div className='flex gap-3 mb-3'>
                <button className='bg-[#f5f5f5] text-[#0a0a0a] text-xs font-medium px-2 py-1 rounded-md mt-2'>
                    <SlLike className='inline-block mr-1'/>{trend.likes}
                </button>
                <button className='bg-[#f5f5f5] text-[#0a0a0a] text-xs font-medium px-2 py-1 rounded-md mt-2'>
                    <TfiCommentAlt className='inline-block mr-1'/>87
                </button>
            </div>
                </div>
            </div>
          
        </div>
       )
         )

       }
     </div>


     
     </div>
     </div>
     <div>
        <DraftsSide/>
     </div>
    </div>
  )
}

export default RightMenu
