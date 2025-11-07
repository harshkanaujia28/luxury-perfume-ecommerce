import express from "express";
import {
  getBrands,
  getBrandById,
  addBrand,
  updateBrand,
  deleteBrand,
} from "../controllers/brandController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/", getBrands);
router.get("/:id", getBrandById);
router.post("/", protect, isAdmin, addBrand);
router.put("/:id", protect, isAdmin, updateBrand);
router.delete("/:id", protect, isAdmin, deleteBrand);

export default router;