// server.js (main backend entry point)
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

// Routes
import bannerRoutes from "./routes/banners.js";
import uploadRoutes from "./routes/upload.routes.js";
import offerRoutes from "./routes/offerRoutes.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";
import returnRoutes from "./routes/returns.js";
import supportRoutes from "./routes/support.js";
import categoryRoutes from "./routes/categories.js";
import brandRoutes from "./routes/brands.js";
import cartRoutes from "./routes/cart.js";
import wishlistRoutes from "./routes/wishlist.js";
import vendorRoutes from "./routes/vendors.js";
import newsletterRoutes from "./routes/newsletter.js";
import contactRoutes from "./routes/contact.js";
import legalRoutes from "./routes/legal.js";
import zoneRoutes from "./routes/zones.js";
import dashboardRoutes from "./routes/dashboard.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

/* ======================================================
   ✅ CORS (FINAL – Render + Vercel SAFE)
   ====================================================== */
app.use(
  cors({
    origin: process.env.CLIENT_URL, // e.g. https://luxury-perfume-ecommerce.vercel.app
    credentials: true,
  })
);

/* ======================================================
   Middleware
   ====================================================== */
app.use(express.json());
app.use(cookieParser());

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

/* ======================================================
   Socket.IO
   ====================================================== */
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
});

/* ======================================================
   Routes
   ====================================================== */
app.use("/api/coupons", couponRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin/product", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/returns", returnRoutes);
app.use("/api/support", supportRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/legal-documents", legalRoutes);
app.use("/api/zones", zoneRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/upload", uploadRoutes);

/* ======================================================
   Health Check
   ====================================================== */
app.get("/", (req, res) => {
  res.send("Backend is running");
});

/* ======================================================
   MongoDB + Server Start
   ====================================================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    server.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

/* ======================================================
   Error Handler
   ====================================================== */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
});
