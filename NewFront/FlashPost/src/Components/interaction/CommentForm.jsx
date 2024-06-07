import React, { useState } from "react";

const CommentForm = ({ onSubmit }) => {
  const [content, setContent] = useState("");

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      return;
    }
    onSubmit(content);
    setContent(""); 
  };

  return (
    <div>
      <textarea
        value={content}
        onChange={handleChange} 
        placeholder="Add a comment..."
        rows={2}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={handleSubmit} 
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Post Comment
      </button>
    </div>
  );
};

export default CommentForm;
