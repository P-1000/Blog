import React, { useState, useContext } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { AiOutlineShareAlt } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import { MdMoreVert } from "react-icons/md";
import { useParams } from "react-router-dom";
import LikeButton from "../interaction/LikeButton";
import BookmarkButton from "../interaction/BookmarkButton";
import { useAuthContext } from "../../context/userContext";
import CommentSection from "../interaction/CommentSection";
import { useModal } from "../../context/modalContext";
import CommentPage from "../../Pages/Comments/CommentPage";

const ToolBar = (props) => {
  const { openModal } = useModal();
  const { authUser, token, isLoading } = useAuthContext();
  const { blogId } = useParams();
  const [isCommentSectionVisible, setCommentSectionVisible] = useState(false);
  const handleComment = () => {
    setCommentSectionVisible(!isCommentSectionVisible);
  };

  const handleShare = () => {};
  const handleBookmark = () => {};
  const handleMore = () => {};

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const openCommentSection = () => {
    openModal(<CommentPage />, "Comments");
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white border rounded-full shadow-xl px-3 py-1">
        <div className="flex gap-1 py-2 px-3">
          <LikeButton blogId={blogId} initialLikes={props.likes} />
          <BookmarkButton user={authUser} token={token} blogId={blogId} />

          <div className="w-1 h-1 rounded-full bg-black items-center mt-2" />
          <button onClick={openCommentSection}>
            <div
              onClick={handleComment}
              className="flex gap-1 cursor-pointer items-center hover:bg-gray-400/40 rounded-full px-2 transition-all"
            >
              <div className="flex items-center justify-center">
                <FaRegCommentDots />
              </div>
              <div>
                <h1 className="">12</h1>
              </div>
            </div>
          </button>
          <div className="w-1 h-1 rounded-full bg-black items-center mt-2" />
          <div className="flex gap-1 cursor-pointer items-center hover:bg-gray-400/40 rounded-full px-2 transition-all">
            <div className="flex items-center justify-center">
              <AiOutlineShareAlt />
            </div>
          </div>
          <div className="w-1 h-1 rounded-full bg-black items-center mt-2" />
          <div className="flex gap-1 cursor-pointer items-center hover:bg-gray-400/40 rounded-full px-2 transition-all">
            <div className="flex items-center justify-center">
              <MdMoreVert />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolBar;
