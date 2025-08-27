import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Coupon code is required"],
      unique: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["Percentage", "Fixed Amount", "Free Shipping"],
      required: [true, "Coupon type is required"],
    },
    value: {
      type: Number,
      required: [true, "Coupon value is required"],
    },
    minOrder: {
      type: String, // keep string if you want to allow empty
    },
    usedCount: {
      type: Number,
      default: 0, // ✅ tracks how many times the coupon has been used
    },
    totalLimit: {
      type: Number,
      required: [true, "Total usage limit is required"],
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Expired"],
      default: "Active",
    },
    expiry: {
      type: String, // could be Date if you want strict validation
    },
    createdDate: {
      type: String,
      default: () => new Date().toISOString(),
    },
    startDate: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Coupon = mongoose.model("Coupon", couponSchema);
