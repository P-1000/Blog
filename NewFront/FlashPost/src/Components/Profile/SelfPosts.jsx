import React, { useContext } from "react";
import { AuthContext } from "../../context/userContext";
import BlogCard from "./BlogCard";
import { toast, Toaster } from "react-hot-toast";
import instance from "../../Config/AxiosInst.js";

const SelfPosts = ({ blogs, loading, User }) => {
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  const { authUser, token } = useContext(AuthContext);
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const handleDelete = async (blogId) => {
    if (!blogId) {
      return toast.error("Invalid Blog Id");
    }

    if (window.confirm("Are you sure you want to delete this post?")) {
      toast.promise(
        instance.delete(`/api/blogs/delete/${blogId}`, config),
        {
          loading: 'Deleting post...',
          success: 'Post deleted successfully!',
          error: 'Error deleting post!',
        }
      ).then(() => {
        window.location.reload();
      }).catch(error => {
        console.error("Error deleting post:", error);
      });
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            handleDelete={handleDelete}
            authUser={authUser}
          />
        ))}
      </div>
      <Toaster />
    </>
  );
};

export default SelfPosts;
