import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import CommentSection from "../../Components/interaction/CommentSection";
import CommentForm from "../../Components/interaction/CommentForm";
import { AuthContext } from "../../context/userContext";

const CommentPage = () => {
  const location = useLocation();
  const blogId = location.pathname.split("/")[3];
  const [comments, setComments] = useState([]);
  const { token } = useContext(AuthContext);
  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/comments/${blogId}`
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [blogId]);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const onSubmit = async (content) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/comments/create",
        {
          blogId,
          content: content,
          postId: blogId,
        },
        config
      );
      //   setComments([...comments, response.data]);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div>
      <CommentSection comments={comments} />
      <CommentForm onSubmit={onSubmit} />
    </div>
  );
};

export default CommentPage;
