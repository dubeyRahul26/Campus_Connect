import express from "express";
import {
  applyToJob,
  getMyApplications,
  updateApplicationStatus,
  withdrawApplication,
} from "../controllers/application.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

/* Student applies to a job */
router.post("/", protectRoute, applyToJob);

/* Student dashboard */
router.get("/me", protectRoute, getMyApplications);

router.delete("/:id", protectRoute, withdrawApplication);
router.put("/:id/status", protectRoute, updateApplicationStatus);

export default router;
