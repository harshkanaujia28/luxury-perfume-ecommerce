import express from "express";
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import multer from "multer";
import path from "path";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", protect, isAdmin, upload.none(), addProduct);
router.put("/admin/product/:id", protect, isAdmin, upload.array("images", 5), updateProduct); // ✅ updated
router.delete("/admin/product/:id", protect, isAdmin, deleteProduct);

export default router;
