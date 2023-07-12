import React from 'react'
import { useState , useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
import SearchCard from './SearchCard';
import SideNav from '../SideBar/SideNav';


function SearchRes(props) {
  const {imgUrl , title , desc , blog_id  , Author , time} = props
  const [s , sc]  = useState('')
  const [coverImg , setcoverImg] = useState({})
console.log(imgUrl)
// Use the URL to display the image
const img = new Image();

const date = new Date(time);
const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'Asia/Kolkata' };
const formattedDate = date.toLocaleString('en-IN', options);

const {query} = useParams()
const search = query
console.log(search)
const [data , setData] = useState([])
async function handleSearch(){
    const res = await axios.get(`https://back-e0rl.onrender.com/api/search?query=${search}`)
    const data = res.data
    setData(data)
}
useEffect(() => {
    handleSearch()
}, [search])

  return (
 <>
   <div className='flex'>
    <div className='hidden lg:block'>
      <SideNav />
    </div>
      <div className='w-9/12 mt-8 rounded-md bg-white border'>
      <div className=''>
            {
                data.map((item) => {
                    return (
                      <Link to={`/blog/@${item.Author}/${item._id}`}>
                      <SearchCard key={item.blog_id} {...item} />
                      </Link>
                    )
                })
            }
        </div>
      </div>
   </div>
   
 </>
  )
}

export default SearchRes
