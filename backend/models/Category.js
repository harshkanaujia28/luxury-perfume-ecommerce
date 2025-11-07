import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    products: { type: Number, default: 0 },
    image: String,
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);