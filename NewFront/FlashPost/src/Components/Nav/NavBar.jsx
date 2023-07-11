import React from 'react'
import {CiSearch} from 'react-icons/ci'
import {MdCreate} from 'react-icons/md'
import {RxAvatar} from 'react-icons/rx'
import {IoNotificationsOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess } from '../../redux/userSlice';
import { useState , useEffect } from 'react'
import axios from 'axios'
import MouseOverPopover from './Profile.jsx'
function NavBar() {
    const { currentUser } = useSelector(state => state.user);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const token = localStorage.getItem('jwt');
    const tok = JSON.parse(token);
    const config = {
        headers: { Authorization: `Bearer ${tok}` }
    }
   
    const [user, setUser] = useState([]);
     useEffect(()=>{
       async function fetchData(){
         const res = await axios.get('https://back-e0rl.onrender.com/api/auth/read', config)
          console.log(res.data)
            setUser(res.data)
         dispatch(loginSuccess(res.data));
       }
         fetchData()
    },[])

    const usr = localStorage.setItem('user', JSON.stringify(user));

    const [search , setSearch] = useState('')
    
    async function handleChange(event){
        const search = event.target.value;
        setSearch(search);
       navigate(`/search/${search}`)
    }

  return (
    <div className='border-b-[1px] bg-white'>
    <div className='grid grid-cols-12 gap-[1rem] p-3 mx-4 '>
        <div className='col-span-3'>
           <a href='/Home'>
           <img src='../Images/logo-standard.png' alt='logo' className='h-6 lg:h-8 mt-[5px] hidden lg:block' />
           <img src='../Images/favicon.png' alt='logo' className='h-12 mt-[7px] block lg:hidden' />
           </a>
        </div>
        <div className='flex col-span-6 gap-4'>
            <div>
                <button onClick={()=>navigate('/Home')}
                    className='border hidden lg:block border-gray-300 rounded-full px-4 py-2 text-sm  
                    font-semibold text-gray-700 mr-2 hover:bg-gray-100'
                >Your Feed</button>
            </div>

            <div className="flex flex-row-reverse focus-within:border rounded-full px-4 py-2 pr-[16rem] 
             text-sm 
             focus-within:border-secondary">
                {/* search bar navigate to searchres page on enter */}
             <input type="text" 
             value={search} 
             onChange={handleChange}
              className="border-none focus:outline-none w-full text-primary"
                 placeholder="Search Flashpost"/>
            <div className="  h-full flex items-center pr-2">
                     <CiSearch className='text-xl text-gray-400' />
                </div>
            </div>


        </div>
       {
        currentUser &&  <div className='flex col-span-3 justify-around w-full'>
        <div>
            <button 
            onClick={()=>navigate('/Write')}
            className=' w-full bg-primary rounded-full flex gap-2 px-4 py-2 text-sm
                font-semibold text-secondary mr-2 hover:bg-gray-100'>
                    <MdCreate className='text-xl text-white' />
                <p> Create</p>
            </button>
        </div>
        <div className='flex justify-between gap-7'>
            <button>
            <IoNotificationsOutline className='text-2xl text-gray-400' />
            </button>
            <button>
            {/* <RxAvatar className='text-4xl text-gray-400' /> */}
            <MouseOverPopover 
            name={user.name}
            className='text-4xl' />
            </button>
        </div>
    </div>
       }

    {
        !currentUser && 
        <div> 
           <div className='mx-36 flex col-span-3 gap-3 justify-around w-full'>
        <div>
            <button 
            onClick={()=>navigate('/')}
            className=' w-full bg-secondary rounded-full px-4 py-2 text-sm
                font-semibold text-primary hover:bg-gray-100'>
                <p> Login</p>
            </button>
        </div>
        <button 
            onClick={()=>navigate('/signup')}
            className=' w-full bg-primary rounded-full flex gap-2 px-4 py-2 text-sm
                font-semibold text-secondary mr-2 hover:bg-gray-100'>
                <p> SignUp</p>
            </button>
    </div> 
        </div>
    }

    </div>
    </div>
  )
}

export default NavBar
