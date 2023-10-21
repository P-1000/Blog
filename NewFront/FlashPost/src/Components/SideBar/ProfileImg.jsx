import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {motion} from 'framer-motion'

const ProfileImg = (props) => {
    const {name} = props
    const [authorImage, setAuthorImage] = useState('https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=1380&t=st=1686593562~exp=1686594162~hmac=f005e8ed7cd56c39de3f6f72ab0b1b59e49341632842e37dd41b151dfac52adc');

    useEffect(() => {
        const fetchAuthorImage = async (author) => {
            try {
                const res = await axios.get(`http://localhost:3000/api/users/userProfile/${author}`);
                console.log(res.data);
                setAuthorImage(res.data)
                return res.data;
            } catch (error) {
                console.log(error);
            }
        };
        fetchAuthorImage(name);
    }, []);


  return (
    
  <div className='w-10 h-9 rounded-[100%] border-primary'>
  <Link to={`/Profile/@${name}`}>
  <motion.img
    style={{
        cursor: 'pointer',
        width: '50px',
        height: '50px'
    }}
    whileTap={{ scale: 0.9 }}
    whileHover={{ scale: 1.06 }}
    src={authorImage}
    alt={name}
    className='w-10 h-10 rounded-full object-cover'
/>

</Link>
  </div>
  )
}

export default ProfileImg