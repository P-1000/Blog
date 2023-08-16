import React, { useEffect , useState } from 'react'

const AsideAuthor = (props ) => {

  const blog = props.Author

  const [Author, setAuthor] = useState(blog.Author)



  return (
    <div>{
    <h1>
      {blog.Author}
    </h1>
    }
    </div>
  )
}

export default AsideAuthor