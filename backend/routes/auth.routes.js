import express from "express";
import { getMe, signin, signout, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.get("/me", protectRoute, getMe);
router.put("/profile", protectRoute, updateProfile);

export default router;
