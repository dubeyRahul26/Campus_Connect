import express from "express";
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  toggleUpvote,
  toggleHidePost,
} from "../controllers/interviewPrep.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getPosts);
router.post("/", protectRoute, createPost);
router.put("/:id", protectRoute, updatePost);
router.delete("/:id", protectRoute, deletePost);
router.post("/:id/upvote", protectRoute, toggleUpvote);
router.post("/:id/hide", protectRoute, toggleHidePost);

export default router;
