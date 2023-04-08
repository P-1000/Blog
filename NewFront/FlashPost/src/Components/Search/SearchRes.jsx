import React from 'react'
import { useState , useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import SearchCard from './SearchCard';


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
    const res = await axios.get(`http://localhost:3000/api/search?query=${search}`)
    console.log(res.data)
    const data = res.data
    setData(data)
}
useEffect(() => {
    handleSearch()
}, [search])

  return (
 <>
   <div>
        <div className='w-8/12 '>
            {
                data.map((item) => {
                    return <SearchCard key={item.blog_id} {...item} />
                })
            }
        </div>
   </div>
   
 </>
  )
}

export default SearchRes
