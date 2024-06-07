import React, { useContext } from "react";
import { AuthContext } from "../../context/userContext";
import BlogCard from "./BlogCard";

const SelfPosts = ({ blogs, loading, User }) => {
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  const { authUser } = useContext(AuthContext);

  const handleEdit = (id) => {};

  const handleDelete = () => {};

  const handleArchive = () => {};

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          authUser={authUser}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleArchive={handleArchive}
        />
      ))}
    </div>
  );
};

export default SelfPosts;
