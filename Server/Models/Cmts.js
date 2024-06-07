import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Blog",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  replies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  parentComment: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
  },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
