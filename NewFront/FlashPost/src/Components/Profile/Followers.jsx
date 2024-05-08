import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import instance from '../../Config/AxiosInst';

function Followers(props) {
  const { flr } = props;
  const flrs = flr.Followers;
  const [members, setMembers] = useState([]);

  async function fetchMembers(id) {
    const res = await fetch(`https://back-e0rl.onrender.com/api/users/fetchId/${id}`);
    // const res = await instance.get(`/api/users/fetchId/${id}`);
    const data = await res.json();
    setMembers((prevMembers) => [...prevMembers, data]);
  }

  useEffect(() => {
    if (flrs && flrs.length > 0) {
      flrs.forEach((id) => {
        fetchMembers(id);
      });
    }
  }, [flrs]);

  return (
    <div className='space-y-2'>
      <div className='grid grid-cols-3 gap-4'>
        {members &&
          members.map((id) => (
            <div onClick={()=>{window.location.href=`/profile/@${id.name}`} }
              key={id.name}
              className='relative p-2 border rounded-lg transition-transform hover:scale-105'
            >
              <Link to={`/profile/@${id.name}`} className='flex items-center space-x-4'>
                <img
                  className='w-10 h-10 object-cover rounded-full'
                  src={id.ProfilePic}
                  alt={`${id.name}'s Profile`}
                />
                <div className='text-gray-700'>{id.name}</div>
              </Link>
              <div className='hidden absolute left-0 right-0 bg-white p-4 border mt-2 rounded-lg shadow'>
                {/* Your additional content here */}
                <p>Email: {id.email}</p>
                <p>Age: {id.age}</p>
                {/* Add more details as needed */}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Followers;
