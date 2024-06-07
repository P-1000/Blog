import React from "react";

const Comment = ({ cmt }) => {
  return (
    <div>
      {cmt && (
        <div className="flex items-center mb-4">
          <img
            src="https://randomuser.me/api/portraits"
            alt="user"
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-4">
            <h2 className="font-semibold">{cmt.author}</h2>
            <p>{cmt.content}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
