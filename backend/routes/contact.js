import express from "express";
import {
  submitContactMessage,
  getContactMessages,
} from "../controllers/contactController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/", submitContactMessage);
router.get("/", protect, isAdmin, getContactMessages);

export default router;