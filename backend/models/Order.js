import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    customer: String,
    email: String,

    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        selectedSize: { type: String, required: true },
        name: String,
        brand: String,
        price: Number,
        image: String,
        offer: {
          isActive: { type: Boolean, default: false },
          type: { type: String, enum: ["percentage", "flat"], default: null },
          value: { type: Number, default: 0 },
          discountApplied: { type: Number, default: 0 },
        },
      },
    ],

    itemsTotal: { type: Number, default: 0 },
    deliveryFee: { type: Number, default: 0 },
    taxAmount: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    finalTotal: { type: Number, default: 0 },

    // 🟢 Coupon Snapshot
    couponCode: { type: String },
    couponType: {
      type: String,
      enum: ["Percentage", "Fixed Amount", "Free Shipping"],
      default: null,
    },
    couponValue: { type: Number, default: 0 },
    couponDiscount: { type: Number, default: 0 },

    // 🟢 Active offer snapshot
    activeOffer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Offer",
      default: null,
    },

    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      phone: { type: String, required: true },
    },
    deliveryTime: { type: String },

    // 🟢 Payment fields
    paymentMethod: {
      type: String,
      enum: ["COD", "Razorpay"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending", // COD & Razorpay dono ke liye start hoga pending se
    },

    // Razorpay specific fields
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },

    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
