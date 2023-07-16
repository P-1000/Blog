import React, { useEffect , useState } from 'react'

const AsideAuthor = (props ) => {

  const Author = props.Author;



  return (
    <div>{
    <h1>
      {Author.name}
    </h1>
    }</div>
  )
}

export default AsideAuthor