import React, { useState } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog, authUser , handleDelete }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const handleOptionClick = () => {
    setOpenMenu(!openMenu);
  };

  const handleEditClick = (blogId) => {
    setOpenMenu(false);
    navigate(`/Edit/${blogId}`);
  };

  const handleDeleteClick = (blogId) => {
    setOpenMenu(false);
    handleDelete(blogId);
  };

  const handleReportClick = (blogId) => {
    setOpenMenu(false);
    handleReport(blogId);
  };

  const handleArchiveClick = (blogId) => {
    setOpenMenu(false);
    handleArchive(blogId);
  };

  return (
    <div className="bg-white rounded-lg border shadow-md p-5 transition duration-100 ease-in-out transform hover:scale-105 relative">
      <img src={blog.imgUrl} alt={blog.title} className="w-full h-48 object-cover mb-4 rounded-md" />
      <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
      <p className="text-gray-600 mb-4">{blog.content}</p>
      <div className="flex items-center justify-between text-gray-500">
        <p>{formatDate(blog.createdAt)}</p>
        <span className="text-gray-500">Likes: {blog.likes}</span>
      </div>
      <div className="w-full text-sm mt-2">{blog.desc.slice(0, 100)}...</div>
      {authUser && authUser.name === blog.Author && (
        <div className="absolute top-2 right-2">
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="bg-gray-100 rounded-full p-1 hover:bg-gray-400 focus:outline-none"
                onClick={handleOptionClick}
              >
                <AiOutlineEllipsis className="text-gray-600" />
              </button>
            </div>
            {openMenu && (
              <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <div className="py-1" role="none">
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" onClick={() => handleEditClick(blog._id)}>
                    Edit
                  </button>
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" onClick={() => handleDeleteClick(blog._id)}>
                    Delete
                  </button>
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" onClick={() => handleArchiveClick(blog._id)}>
                    Archive
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
