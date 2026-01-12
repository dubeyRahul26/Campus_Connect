import express from "express";
import multer from "multer";
import { analyzeResume } from "../controllers/resume.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import rateLimit from "express-rate-limit";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
});

const resumeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // 20 analyses per 15 minutes
});

router.post(
  "/",
  resumeLimiter,
  protectRoute,
  upload.single("resume"),
  analyzeResume
);

export default router;
