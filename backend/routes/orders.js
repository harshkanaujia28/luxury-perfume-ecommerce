import express from "express";
import {
  placeOrder,
  getOrders,
  trackOrder,
  requestReturn,
  getRevenue,
  updateOrderStatusByAdmin,
  getOrdersByUser,
  getOrderById,
  cancelOrder,
 
} from "../controllers/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isUser, isAdmin } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// ✅ Place specific routes BEFORE dynamic ones
router.get("/my-orders", protect, getOrdersByUser);
router.get("/revenue", protect, isAdmin, getRevenue);
router.post("/:id/return", protect, requestReturn); // 👈 Ensures only users can access
router.get("/track/:id", protect, trackOrder);
router.put("/:id/status", protect, isAdmin, updateOrderStatusByAdmin);
router.patch("/:id/cancel", protect, cancelOrder); // ⬅️ Add this line
router.post("/", protect, isUser, placeOrder);
router.get("/", protect, getOrders);
// ⛔ Always keep this last
router.get("/:id", protect, getOrderById);

export default router;