import express from "express";
import { getAdminStats } from "../controllers/admin.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/role.middleware.js";

const router = express.Router();

router.get("/stats", protectRoute, isAdmin, getAdminStats);

export default router;
