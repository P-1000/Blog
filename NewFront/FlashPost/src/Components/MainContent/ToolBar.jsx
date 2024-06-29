import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../context/userContext";
import { useModal } from "../../context/modalContext";
import CommentPage from "../../Pages/Comments/CommentPage";
import ToolbarIcon from "../BlogDetails/IconToolbar";
import instance from "../../Config/AxiosInst";

const ToolBar = (props) => {
  const { openModal } = useModal();
  const { authUser, token, isLoading } = useAuthContext();
  const { blogId } = useParams();
  const [likes, setLikes] = useState(props.likes);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Check if the user has already liked the blog
    const checkIfLiked = async () => {
      try {
        const res = await instance.get(`/api/blogs/isliked/${blogId}/${9}}`);
        setLiked(res.data.isLiked);
      } catch (error) {
        console.error(error);
      }
    };

    checkIfLiked();
  }, [blogId]);

  const handleComment = () => {
    openModal(<CommentPage />, "Comments");
  };

  const handleShare = () => {
    // Implement share logic
  };

  const handleBookmark = () => {
    // Implement bookmark logic
  };

  const handleMore = () => {
    // Implement more options logic
  };

  const handleLike = async () => {
    try {
      const res = await instance.post(
        `/api/blogs/like/${blogId}`,
        { userId: authUser.id },
        { headers: { Authorization: `Bearer ${token}` } }
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
      const res = await instance.put(
        `/api/blogs/unlike/${blogId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        setLikes(likes - 1);
        setLiked(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center">
      <ToolbarIcon
        onLike={liked ? handleUnlike : handleLike}
        onComment={handleComment}
        onBookmark={handleBookmark}
        onShare={handleShare}
        onMore={handleMore}
        initialLikes={likes}
      />
    </div>
  );
};

export default ToolBar;
