import express from "express";
import { createOffer, getOffers, deleteOffer } from "../controllers/offerController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, isAdmin, createOffer);
router.get("/", protect, isAdmin, getOffers);
router.delete("/:id", protect, isAdmin, deleteOffer);

export default router;
