import mongoose from "mongoose";

//  Review Schema
const reviewSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    comment: { type: String, required: true },
    stars: { type: Number, min: 1, max: 5, required: true },
  },
  { timestamps: true }
);

//  Offer Schema
const offerSchema = new mongoose.Schema(
  {
    isActive: { type: Boolean, default: false },
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

//  Specification Schema
const specificationSchema = new mongoose.Schema(
  {
    skinType: String,
    longevity: String,
    sillage: String,
    season: String,
  },
  { _id: false }
);

//  Category Schema
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

//  Product Schema
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    brandimage: { type: String, required: false },
    price: { type: Number, required: true },
    originalPrice: Number,
    image: { type: String, required: true },
    images: { type: [String], default: [] },
    description: { type: String, required: true },
    category: { type: categorySchema, required: true },

    quantity: { type: [String], default: [] },

    // Stock
    stock: { type: Number, required: true, default: 1, min: 0 },

    // Reviews + rating
    rating: { type: Number, default: 0 },
    reviews: { type: [reviewSchema], default: [] },

    features: { type: [String], default: [] },
    specifications: { type: specificationSchema, required: true },
    offer: offerSchema,
  },
  { timestamps: true }
);

// Auto calculate rating from reviews
productSchema.pre("save", function (next) {
  if (this.reviews.length > 0) {
    const totalStars = this.reviews.reduce((acc, r) => acc + r.stars, 0);
    this.rating = totalStars / this.reviews.length;
  } else {
    this.rating = 0;
  }
  next();
});

export default mongoose.model("Product", productSchema);
