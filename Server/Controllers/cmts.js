import User from "../Models/User.js";
import Comment from "../Models/Cmts.js";

export const createComment = async (req, res) => {
  const author = req.user.id;
  const { content, postId, parentComment } = req.body;

  if (!author) return res.status(401).json({ message: "Unauthorized" });
  if (!content || !postId)
    return res
      .status(400)
      .json({ message: "Content and Post ID are required." });

  try {
    const newComment = new Comment({
      author,
      postId,
      content,
    });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Error creating comment" });
  }
};
export const getComments = async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.find({ postId }).populate("author");
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error Fetching Comments" });
  }
};
