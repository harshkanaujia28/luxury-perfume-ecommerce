import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    address: String,
    companyName: String,
    profileImage: String,
    products: [String],
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Vendor", vendorSchema);
