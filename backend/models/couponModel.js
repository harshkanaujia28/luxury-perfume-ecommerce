import mongoose from "mongoose"

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
      type: String, // As per your interface
    },
    usage: {
      type: String,
    },
    usedCount: {
      type: Number,
      default: 0,
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
      type: String, // Can be changed to Date if you prefer stricter typing
    },
    createdDate: {
      type: String,
      default: () => new Date().toISOString(), // match interface string type
    },
    startDate: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
)

export const Coupon = mongoose.model("Coupon", couponSchema)
