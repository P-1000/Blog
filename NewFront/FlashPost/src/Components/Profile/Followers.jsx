import React, { useEffect, useState } from 'react';

function Followers(props) {
  const { flr } = props;
  const flrs = flr.Followers;
  const [members, setMembers] = useState([]);

  async function fetchMembers(id) {
    const res = await fetch(`http://localhost:3000/api/users/fetchId/${id}`);
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
    <div className='flex justify-between mx-6  my-6'>
      <div>
      {members && members.map((id) => <div key={id}>{id.name}</div>)}
      </div>
      <div className='w-[20%] border'>
      {members && members.map((id) => <div key={id}>
        <img className='w-10 h-10 object-cover rounded-full' src={id.ProfilePic} />
      </div>)}
      </div>
    </div>
  );
}

export default Followers;
