import mongoose from "mongoose";

// ================= Review Schema =================
const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    comment: { type: String, required: true },
    stars: { type: Number, min: 1, max: 5, required: true },
  },
  { timestamps: true }
);

// ================= Offer Schema =================
const offerSchema = new mongoose.Schema(
  {
    isActive: { type: Boolean, default: false },
    type: { type: String, enum: ["percentage", "fixed", "bogo", "bundle"] },
    value: {
      type: Number,
      required: function () {
        return this.type !== "bogo";
      },
    },
    startDate: { type: Date },
    endDate: { type: Date },
    description: { type: String },
    minQuantity: { type: Number },
    maxUses: { type: Number },
    usedCount: { type: Number, default: 0 },
  },
  { _id: false }
);

// Auto-check offer validity
offerSchema.methods.isOfferValid = function () {
  const now = new Date();

  if (this.startDate && now < this.startDate) return false;
  if (this.endDate && now > this.endDate) return false;
  if (this.maxUses && this.usedCount >= this.maxUses) return false;

  return true;
};

// ================= Specification Schema =================
const specificationSchema = new mongoose.Schema(
  {
    longevity: String, // ⏳ कितने समय तक टिकता है
    highlight: {
      type: String,
      default: "",
      // Example: "Perfect for summer evenings, parties, and casual outings"
    },
  },
  { _id: false }
);

// ================= Category Schema =================
const categorySchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["Perfume", "Attar"], required: true },
    gender: { type: String, enum: ["Men", "Women", "Unisex"], required: true },

    // multiple select allowed now
    subCategories: {
      type: [
        {
          type: String,
          enum: [
            "Celebrity",
            "Summer",
            "Gym",
            "Office",
            "Winter",
            "Party, Dates, Special Occasion", // ✅ treat as single category
            "Traditional",
            "Spiritual & Devotional",
          ],
        },
      ],
      default: [],
    },
  },
  { _id: false }
);

// ================= Product Schema =================
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    brandimage: { type: String },

    price: { type: Number, required: true },
    originalPrice: { type: Number },

    image: { type: String, required: true },
    images: { type: [String], default: [] },

    description: { type: String, required: true },
    category: { type: categorySchema, required: true },

    // Stock & Quantity
    quantity: { type: [String], default: [] },
    stock: { type: Number, required: true, default: 1, min: 0 },

    // Reviews
    rating: { type: Number, default: 0 },
    reviews: { type: [reviewSchema], default: [] },

    features: { type: [String], default: [] },
    specifications: { type: specificationSchema, required: true },

    // Offer
    offer: offerSchema,
  },
  { timestamps: true }
);

// ================= Hooks & Methods =================
productSchema.pre("save", function (next) {
  if (this.reviews.length > 0) {
    const totalStars = this.reviews.reduce((acc, r) => acc + r.stars, 0);
    this.rating = totalStars / this.reviews.length;
  } else {
    this.rating = 0;
  }

  if (this.offer) {
    this.offer.isActive = this.offer.isOfferValid();
  }

  next();
});

export default mongoose.model("Product", productSchema);
