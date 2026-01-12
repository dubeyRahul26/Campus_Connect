import express from "express";
import {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
  getJobApplicants,
} from "../controllers/job.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/role.middleware.js";

const router = express.Router();

// Public (logged-in users)
router.get("/", protectRoute, getAllJobs);

// Admin only
router.post("/", protectRoute, isAdmin, createJob);
router.put("/:id", protectRoute, isAdmin, updateJob);
router.delete("/:id", protectRoute, isAdmin, deleteJob);
router.get("/:id/applicants", protectRoute, isAdmin, getJobApplicants);

export default router;

