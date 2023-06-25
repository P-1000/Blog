import React, { useEffect , useState } from 'react'

function AuthoImg(props) {

    const author_name = props.author_name;
    const [author_Image, setAuthor_Image] = useState('https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=1380&t=st=1686593562~exp=1686594162~hmac=f005e8ed7cd56c39de3f6f72ab0b1b59e49341632842e37dd41b151dfac52adc');
    useEffect(() => {
        const fetchUserProfile = async () => {
            const res = await fetch(`https://back-e0rl.onrender.com/api/users/userProfile/${author_name}`);
            const data = await res.json()
            console.log(data)
            console.log(data)
            setAuthor_Image(data);
        }
        fetchUserProfile();
    }, [])


  return (
   <>
    <img className='rounded-full h-12 w-12 object-right object-cover' src={author_Image} />
   </>
  )
}

export default AuthoImg