import express from "express";
import {
  subscribeNewsletter,
  getSubscribers,
} from "../controllers/newsletterController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/", subscribeNewsletter);
router.get("/", protect, isAdmin, getSubscribers);

export default router;
