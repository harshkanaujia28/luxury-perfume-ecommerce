import express from "express";
import { login, register, getProfile, updateProfile } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);


export default router;