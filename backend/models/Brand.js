import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    fragrances: Number,
    image: String,
    status: {
      type: String,
      enum: ["Active", "Inactive", "Pending"],
      default: "Pending",
    },
    country: String,
    founded: String,
    totalSales: Number,
    rating: Number,
    marketShare: Number,
    category: {
      type: {
        type: String,
        enum: ["Perfume", "Attar"],
        required: true,
      },
      gender: {
        type: String,
        enum: ["Men", "Women"],
        required: true,
      },
      subCategory: {
        type: String,
        enum: [
          // Common
          "Celebrity",
          "Summer",
          "Gym",
          "Office",
          "Winter",
          // Perfume-specific
          "Party, Dates, Special Occasion",
          // Attar-specific
          "Traditional",
          "Spiritual & Devotional",
        ],
        required: true,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Brand", brandSchema);
