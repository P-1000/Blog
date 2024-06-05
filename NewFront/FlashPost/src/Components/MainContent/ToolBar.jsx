import React, { useEffect, useState } from "react";
import { SlLike } from "react-icons/sl";
import { FaRegCommentDots } from "react-icons/fa";
import { AiOutlineShareAlt } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import { AiFillLike } from "react-icons/ai";
import { MdMoreVert } from "react-icons/md";
import instance from "../../Config/AxiosInst";
import { useParams } from "react-router-dom";

const ToolBar = (props) => {
  const { blogId } = useParams();
  const [user_id, setUser_id] = useState(null);
  const token = localStorage.getItem("jwt");
  const user_ = JSON.parse(localStorage.getItem("user"));
  const tok = JSON.parse(token);
  const config = { headers: { Authorization: `Bearer ${tok}` } };
  const [liked, setLiked] = useState(false);
  const [propslike, setProplike] = useState(props.likes);

  useEffect(() => {
    setUser_id(user_._id);
  }, [user_]);

  useEffect(() => {
    if (user_id && blogId) {
      isLiked();
    }
  }, [user_id, blogId]);

  const isLiked = async () => {
    const res = await instance.get(`/api/blogs/isliked/${blogId}/${user_id}`);
    setLiked(res.data.isLiked);
  };

  const handleLike = async () => {
    const res = await instance.post(
      `/api/blogs/like/${blogId}`,
      { userId: user_id },
      config
    );
    if (res.status === 200) {
      setProplike(propslike + 1);
    }
  };

  const unlike = async () => {
    await instance.put(`/api/blogs/unlike/${blogId}`, {}, config);
    if (propslike > 0) {
      setProplike(propslike - 1);
    }
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
              <h1 className="mt-1">{propslike}</h1>
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
