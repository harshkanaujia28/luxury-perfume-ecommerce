import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // this must match your Product model name
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  selectedSize: { type: String },
  price: {
    type: Number,
    required: true, // you can make this optional if needed
  },
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  items: [cartItemSchema],
});

export default mongoose.model("Cart", cartSchema);
