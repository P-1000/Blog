import React, { useEffect , useState } from 'react'
import {AiOutlineDoubleRight} from 'react-icons/ai'
import axios from 'axios'
import {Link , useNavigate} from 'react-router-dom'

function TagsSide() {
    const navigate = useNavigate();
    const [tags , setTags] = useState([]);
    
    useEffect(()=>{
      async function getTags(){
        const TagReq = await axios.get('http://localhost:3000/api/TopTags');
        setTags(TagReq.data)
        console.log(tags , "tags bro")
      }
      getTags();
    },[])

  return (
    <div className='mt-4'>
       <div>
     {
        tags && tags.map((item)=>{
            return (
              <Link to={`/search/${item.name}`}
              >
                <div 
                className='flex justify-between mb-[7px] box-border cursor-pointer' style={{ width: '100%' }}>
                <a className='text-[13px] font-normal text-gray-500 box-border hover:text-primary'>#{item.name}</a>
                <p className='border rounded-full h-[20px] box-border px-[8px] py-[1.2px] text-[10px] mt-[1px]'>+{item.count}</p>
              </div>
              </Link>
        )
           
        })
     }
    
       </div>


    </div>
  )
}

export default TagsSide
