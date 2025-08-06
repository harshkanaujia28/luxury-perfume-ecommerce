import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: String,
    name: String,
    comment: String,
    stars: Number,
  },
  { _id: false }
);

const offerSchema = new mongoose.Schema(
  {
    isActive: Boolean,
    type: { type: String, enum: ["percentage", "fixed", "bogo", "bundle"] },
    value: Number,
    startDate: Date,
    endDate: Date,
    description: String,
    minQuantity: Number,
    maxUses: Number,
  },
  { _id: false }
);

const specificationSchema = new mongoose.Schema(
  {
    skinType: String,
    longevity: String,
    sillage: String,
    season: String,
  },
  { _id: false }
);

const categorySchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["Perfume", "Attar"], required: true },
    gender: { type: String, enum: ["Men", "Women"], required: true },
    subCategory: {
      type: String,
      enum: [
        "Celebrity",
        "Summer",
        "Gym",
        "Office",
        "Winter",
        "Party, Dates, Special Occasion",
        "Traditional",
        "Spiritual & Devotional",
      ],
      required: true,
    },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    brandimage: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: Number,
    image: { type: String, required: true },
    images: { type: [String], default: [] },
    description: { type: String, required: true },
    category: { type: categorySchema, required: true },
    
    quantity: {
      type: [String],
      default: [],
    },

    // ✅ Stock quantity field
    stock: {
      type: Number,
      required: true,
      default: 1,
      min: 0,
    },

    rating: { type: Number, default: 0 },
    reviews: { type: [reviewSchema], default: [] },
    features: { type: [String], default: [] },
    specifications: { type: specificationSchema, required: true },
    offer: offerSchema,
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
