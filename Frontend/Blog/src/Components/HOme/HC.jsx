import React from 'react'
import  { useEffect , useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginStart, loginSuccess } from '../../redux/userSlice';
import axios from 'axios'
import Cards from '../Blog_Cards/Cards';

function HC() {
    const dispatch = useDispatch();
    const token = localStorage.getItem('jwt');
    const tok = JSON.parse(token);
    const config = {
        headers: { Authorization: `Bearer ${tok}` }
    }
   
     useEffect(()=>{
       async function fetchData(){
         const res = await axios.get('http://localhost:3000/api/auth/read', config)
          console.log(res.data)
         dispatch(loginSuccess(res.data));
         
       }
         fetchData()
    },[])
 const { currentUser } = useSelector(state => state.user);
  return (
    <div>
      Home page bro
      <Cards/>
    </div>
  )
}

export default HC
