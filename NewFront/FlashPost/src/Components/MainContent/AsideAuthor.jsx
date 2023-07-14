// import React, { useEffect } from 'react'

// function AsideAuthor(props) {
//   const Author = props.Author;
//   const [author, setAuthor] = useState([]);

//     useEffect(()=>{
//       console.log(Author)
//       getAuthor();
//     },[])

//     const getAuthor = async () => {
//       try {
//         const response = await axios.get(`https://back-e0rl.onrender.com/api/user/${Author}`);
//         console.log(response.data , "author data ");
//         setAuthor(response.data);
//         console.log(author)
//       } catch (error) {
//         console.log(error)
//       }
//     }




//   return (
//    <div>
//       <div>
//         <h1>
//           {Author}
//         </h1>

//       </div>
//    </div>
//   )
// }

// export default AsideAuthor

import React from 'react'

const AsideAuthor = (props) => {
  const Author = props.Author;
  return (
    <div>
      {Author}
    </div>
  )
}

export default AsideAuthor