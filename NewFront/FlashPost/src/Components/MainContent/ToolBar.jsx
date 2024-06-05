import React from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { AiOutlineShareAlt } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import { MdMoreVert } from "react-icons/md";
import { useParams } from "react-router-dom";
import LikeButton from "../interaction/LikeButton";

const ToolBar = (props) => {
  const { blogId } = useParams();

  const handleComment = () => {};
  const handleShare = () => {};
  const handleBookmark = () => {};
  const handleMore = () => {};

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white border rounded-full shadow-xl px-3 py-1">
        <div className="flex gap-1 py-2 px-3">
          <LikeButton blogId={blogId} initialLikes={props.likes} />

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
