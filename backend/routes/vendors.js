import express from "express";
import {
  getVendors,
  getVendorById,
  addVendor,
  updateVendor,
} from "../controllers/vendorController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, isAdmin, getVendors);
router.get("/:id", protect, isAdmin, getVendorById);
router.post("/", protect, isAdmin, addVendor);
router.put("/:id", protect, isAdmin, updateVendor);

export default router;