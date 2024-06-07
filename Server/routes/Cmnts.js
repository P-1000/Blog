import express from "express";
import { createComment, getComments } from "../Controllers/cmts.js";
import { verifyToken } from "../Verify.js";

const commentRouter = express.Router();

commentRouter.get("/:postId", getComments);

commentRouter.post("/create", verifyToken, createComment);

export default commentRouter;
