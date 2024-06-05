import express from "express";
import { LikeInteraction } from "../Controllers/interactions.js";
import { verifyToken } from "../Verify.js";

const interaction_router = express.Router();

// like a blog :
interaction_router.post("/like/:bid",  LikeInteraction);


export default interaction_router;
