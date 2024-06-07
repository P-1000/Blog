import React from 'react'
import Comment from './Comment'

function CommentSection({comments}) {
  return (
    <div>
        {
          comments && comments.map((cmt) => () => <Comment cmt={cmt} />)
        }
    </div>
  )
}

export default CommentSection