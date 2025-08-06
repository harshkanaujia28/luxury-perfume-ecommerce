import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, isAdmin, getDashboardStats);

export default router;