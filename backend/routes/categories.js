import express from "express";
import {
  getCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post("/", protect, isAdmin, addCategory);
router.put("/:id", protect, isAdmin, updateCategory);
router.delete("/:id", protect, isAdmin, deleteCategory);

export default router;