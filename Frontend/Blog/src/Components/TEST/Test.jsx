import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Test() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('jwt')){
     navigate('/home')
    }
    else{
      navigate('/Go')
    }
  },[])

  return (
    <div>
     <h1 className="text-3xl font-bold underline">
        Test
    </h1>
    </div>
  )
}

export default Test
