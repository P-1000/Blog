import React, { useState } from "react";
import { Toaster } from "react-hot-toast";

const FormInput = ({
  title,
  description,
  tags,
  coverUrl,
  handleTitleInput,
  handleDescriptionInput,
  handleTagsInput,
  handleImageUpload,
  handleNext,
}) => {
  const [dragging, setDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleImageUpload(file);
  };

  return (
    <div
      className={`flex justify-center items-center h-screen ${
        dragging ? "bg-gray-200" : "bg-gradient-to-br from-purple-50 via-indigo-100 to-blue-50"
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Create a Blog</h1>
          <input
            value={title}
            onChange={handleTitleInput}
            className="w-full bg-gray-200 text-gray-700 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Title"
            style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
          />
          <textarea
            value={description}
            onChange={handleDescriptionInput}
            className="w-full bg-gray-200 text-gray-700 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Description"
            style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
          />
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {dragging ? "Drop image here" : "Upload Cover Image"}
            </label>
            <input
              type="file"
              onChange={(event) => handleImageUpload(event.target.files[0])}
              className="w-full bg-gray-200 text-gray-700 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
            />
          </div>
          <input
            value={tags}
            onChange={handleTagsInput}
            className="w-full bg-gray-200 text-gray-700 rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Tags (comma separated)"
            style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
          />
          <button
            onClick={handleNext}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
           Publish 
          </button>
          {coverUrl && (
            <img
              src={coverUrl}
              alt="Blog Cover"
              className="mt-4 object-cover rounded-md"
            />
          )}
        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
};

export default FormInput;
