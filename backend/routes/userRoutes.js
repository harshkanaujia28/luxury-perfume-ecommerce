import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// ✅ All routes below require admin access


// GET all users
router.get("/",protect, isAdmin, getAllUsers);

// GET a single user
router.get("/:id",protect,isAdmin, getUserById);

// UPDATE user
router.put("/:id",protect, isAdmin, updateUser);

// DELETE user
router.delete("/:id",protect, isAdmin, deleteUser);

export default router;
