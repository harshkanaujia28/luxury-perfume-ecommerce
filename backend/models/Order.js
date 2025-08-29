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
          discountApplied: { type: Number, default: 0 }, // 🟢 kitna discount laga
        },
      },
    ],
    itemsTotal: { type: Number, default: 0 },
    deliveryFee: { type: Number, default: 0 },
    discount: { type: Number, default: 0 }, // ✅ Add this
    finalTotal: { type: Number, default: 0 },

    couponCode: { type: String },
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
    deliveryTime: { type: String }, // zone se aane wala "2-4 business days"

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
