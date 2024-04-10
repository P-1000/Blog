import React, { useEffect, useState } from "react";
import { SlLike } from "react-icons/sl";
import { FaRegCommentDots } from "react-icons/fa";
import { AiOutlineShareAlt } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import { AiFillLike } from "react-icons/ai";
import { MdMoreVert } from "react-icons/md";
import axios from "axios";
import { useParams } from "react-router-dom";
import { lightGreen } from "@mui/material/colors";

const ToolBar = (props) => {
  const { AuthorId, blogId } = useParams();
  const [user_id, setUser_id] = useState(null);
  const token = localStorage.getItem("jwt");
  const user_ids = localStorage.getItem("user");
  const user_ = JSON.parse(user_ids);
  const tok = JSON.parse(token);
  const config = {
    headers: { Authorization: `Bearer ${tok}` },
  };
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setUser_id(user_._id);
  }, [user_]);

  useEffect(() => {
    if (user_id && blogId) {
      setTimeout(isLiked, 0);
    }
  }, [user_id, blogId]);

  const isLiked = async () => {
    const res = await axios.get(
      `https://back-e0rl.onrender.com/api/blogs/isliked/${blogId}/${user_id}`
    );
    setLiked(res.data.isLiked);
  };

  const handleLike = async () => {
    const res = await axios.post(
      `https://back-e0rl.onrender.com/api/blogs/like/${blogId}`,
      null,
      config
    );
    console.log(res.data);
  };

  const unlike = async () => {
    const res = await axios.put(
      `http://localhost:3000/api/blogs/unlike/${blogId}`,
      null,
      config
    );
    console.log(res.data);
  };

  const handleComment = () => {};
  const handleShare = () => {};
  const handleBookmark = () => {};
  const handleMore = () => {};
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white border rounded-full shadow-xl px-3 py-1">
        <div className="flex gap-1 py-2 px-3">
          <div
            className="flex gap-1 cursor-pointer items-center hover:bg-gray-400/40 rounded-full px-2 transition-all"
            onClick={liked ? unlike : handleLike}
          >
            <div className="flex items-center justify-center ">
              {liked ? <AiFillLike /> : <SlLike />}
            </div>
            <div>
              <h1 className="">12</h1>
            </div>
          </div>

          <div className="w-1 h-1 rounded-full bg-black items-center mt-2" />
          <div className="flex gap-1 cursor-pointer items-center hover:bg-gray-400/40 rounded-full px-2 transition-all">
            <div className="flex items-center justify-center ">
              <FaRegCommentDots />
            </div>
            <div>
              <h1 className="">12</h1>
            </div>
          </div>
          <div className="w-1 h-1 rounded-full bg-black items-center mt-2" />
          <div className="flex gap-1 cursor-pointer items-center hover:bg-gray-400/40 rounded-full px-2 transition-all">
            <div className="flex items-center justify-center ">
              <AiOutlineShareAlt />
            </div>
          </div>
          <div className="w-1 h-1 rounded-full bg-black items-center mt-2" />
          <div className="flex gap-1 cursor-pointer items-center hover:bg-gray-400/40 rounded-full px-2 transition-all">
            <div className="flex items-center justify-center ">
              <CiBookmark />
            </div>
          </div>
          <div className="w-1 h-1 rounded-full bg-black items-center mt-2" />
          <div className="flex gap-1 cursor-pointer items-center hover:bg-gray-400/40 rounded-full px-2 transition-all">
            <div className="flex items-center justify-center ">
              <MdMoreVert />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolBar;
