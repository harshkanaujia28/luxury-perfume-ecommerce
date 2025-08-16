import express from "express";
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  addReview,
  updateReview,
  deleteReview,
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
router.put("/admin/product/:id", protect, isAdmin, upload.none(), updateProduct);
router.delete("/admin/product/:id", protect, isAdmin, deleteProduct);
// Review routes
router.post("/:productId/reviews",protect, addReview);
router.put("/:productId/reviews/:reviewId",protect, updateReview);
router.delete("/:productId/reviews/:reviewId",protect, deleteReview);

export default router;
