import React from "react";

const SelfPosts = ({ blogs, loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <div key={blog.id} className="bg-white
        hover:shadow-2xl cursor-pointer transition-all
         rounded-lg border shadow-md p-5">
          <img
            src={blog.imgUrl}
            alt={blog.title}
            className="w-full h-48 object-cover mb-4 rounded-md"
          />
          <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
          <p className="text-gray-600 mb-4">{blog.content}</p>
          <div className="flex items-center justify-between text-gray-500">
            <p>{formatDate(blog.createdAt)}</p>
            <span className="text-gray-500">Likes: {blog.likes}</span>
          </div>

          <div
          className="w-full text-sm"
          >{blog.desc.slice(0, 100)}...</div>
        </div>
      ))}
    </div>
  );
};

export default SelfPosts;
