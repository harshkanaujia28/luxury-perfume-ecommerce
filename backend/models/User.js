import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    country: String,
    role: { type: String, enum: ["admin", "user", "vendor"], default: "user" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);