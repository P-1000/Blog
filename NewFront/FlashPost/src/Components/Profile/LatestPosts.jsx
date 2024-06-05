import React, { useState, useEffect, useContext } from "react";
import SelfPosts from "./SelfPosts";
import instance from "../../Config/AxiosInst";
import { AuthContext } from "../../Context/userContext";
import { useParams } from "react-router-dom";

const LatestPosts = () => {
  const { authUser } = useContext(AuthContext);
  let { User } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchBlogs = async () => {
    try {
       const user = User.slice(1);
      const res = await instance.get(`/api/blogs/author/${user}`);
      setBlogs(res.data);
      console.log(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (User) {
      fetchBlogs();
    }
  }, [User]);
  return (
    <div className="mt-5 py-3 float-center rounded-md mx-20">
      <div>
        <h1 className="text-xl  font-semibold justify-center px-2 tracking-wide">
          My Posts
        </h1>
      </div>
      <div className="mt-4">
        <SelfPosts
            blogs={blogs}
            loading={loading}
            User={User}
         />
      </div>
    </div>
  );
};

export default LatestPosts;
