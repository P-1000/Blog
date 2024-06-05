import React, { useEffect, useState } from "react";
import { SlLike } from "react-icons/sl";
import { AiFillLike } from "react-icons/ai";
import instance from "../../Config/AxiosInst";

const LikeButton = ({ blogId, initialLikes }) => {
  const [user_id, setUser_id] = useState(null);
  const token = localStorage.getItem("jwt");
  const user_ = JSON.parse(localStorage.getItem("user"));
  const tok = JSON.parse(token);
  const config = { headers: { Authorization: `Bearer ${tok}` } };
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  useEffect(() => {
    setUser_id(user_._id);
  }, [user_]);

  useEffect(() => {
    if (user_id && blogId) {
      isLiked();
    }
  }, [user_id, blogId]);

  const isLiked = async () => {
    try {
      const res = await instance.get(`/api/blogs/isliked/${blogId}/${user_id}`);
      setLiked(res.data.isLiked);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async () => {
    try {
      const res = await instance.post(
        `/api/blogs/like/${blogId}`,
        { userId: user_id },
        config
      );
      if (res.status === 200) {
        setLikes(likes + 1);
        setLiked(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnlike = async () => {
    try {
      const res = await instance.put(`/api/blogs/unlike/${blogId}`, {}, config);
      if (res.status === 200) {
        setLikes(likes - 1);
        setLiked(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="flex gap-1 cursor-pointer items-center hover:bg-gray-400/40 rounded-full px-2 transition-all"
      onClick={liked ? handleUnlike : handleLike}
    >
      <div className="flex items-center justify-center ">
        {liked ? <AiFillLike /> : <SlLike />}
      </div>
      <div>
        <h1 className="mt-1">{likes}</h1>
      </div>
    </div>
  );
};

export default LikeButton;
