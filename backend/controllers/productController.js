import mongoose from "mongoose";
import Product from "../models/Product.js";
import { checkOfferStatus } from "../utils/checkOffer.js";

// ✅ Safe JSON parser
const safeParse = (value, fallback) => {
  try {
    if (typeof value === "string") return JSON.parse(value);
    if (typeof value === "object" && value !== null) return value;
    return fallback;
  } catch {
    return fallback;
  }
};

// ✅ Get all products
// ✅ Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    // har ek product ka offer validate karke bhejna
    const updatedProducts = products.map((p) => checkOfferStatus(p));

    res.json({ products: updatedProducts }); // 👈 FIX
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get single product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const updatedProduct = checkOfferStatus(product);

    res.json({ product: updatedProduct }); // 👈 consistency ke liye
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Add product
// ✅ Add product
export const addProduct = async (req, res) => {
  try {
    const images = safeParse(req.body.images, []);
    const features = safeParse(req.body.features, []);
    const category = safeParse(req.body.category, {});
    const quantity = safeParse(req.body.quantity, []);
    const offer = safeParse(req.body.offer, {});

    // ✅ Parse specifications safely
    const rawSpecs = safeParse(req.body.specifications, {});
    const specifications = {
      longevity: rawSpecs.hasOwnProperty("longevity") ? rawSpecs.longevity : "",
      highlight: rawSpecs.hasOwnProperty("highlight") ? rawSpecs.highlight : "",
    };

    // ✅ Only include offer if active and value > 0
    let offerToSave = undefined;
    if (offer && offer.isActive && offer.value > 0) {
      offerToSave = {
        type: offer.type || "percentage",
        value: offer.value,
        startDate: offer.startDate || null,
        endDate: offer.endDate || null,
        description: offer.description || "",
        minQuantity: offer.minQuantity || 0,
        maxUses: offer.maxUses || 0,
        usedCount: 0,
        isActive: true,
      };
    }

    const product = new Product({
      name: req.body.name,
      brand: req.body.brand,
      brandimage: req.body.brandimage || "",
      description: req.body.description,
      price: Number(req.body.price),
      originalPrice: req.body.originalPrice ? Number(req.body.originalPrice) : null,
      stock: Number(req.body.stock),
      features,
      image: images[0] || "",
      images,
      category: {
        type: category.type || "Perfume",
        gender: category.gender || "Unisex",
        subCategories: Array.isArray(category.subCategories) ? category.subCategories : [],
      },
      specifications,  // ✅ Correctly placed here
      quantity,
      offer: offerToSave, // ✅ safe offer
    });

    await product.save();
    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add product",
      error: error.message,
    });
  }
};



// ================= Update Product =================
export const updateProduct = async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("Files:", req.files);

    let images = [];

    // Prefer body images
    if (req.body.images) {
      const parsed = safeParse(req.body.images, []);
      if (Array.isArray(parsed)) images = parsed;
    }

    // Fallback to uploaded files
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => `/uploads/${file.filename}`);
    }

    // Exclude reviews and rating from updates
    const { reviews, rating, ...rest } = req.body;

    // Handle category
    let category = {};
    if (req.body.category) {
      const parsedCategory = safeParse(req.body.category, {});
      category = {
        ...parsedCategory,
        subCategories: Array.isArray(parsedCategory.subCategories)
          ? parsedCategory.subCategories
          : [],
      };
    }

    // Handle specifications
    const rawSpecs = safeParse(req.body.specifications, {});
    const specifications = {
      longevity: rawSpecs.hasOwnProperty("longevity") ? rawSpecs.longevity : "",
      highlight: rawSpecs.hasOwnProperty("highlight") ? rawSpecs.highlight : "",
    };

    // Handle offer safely
    const offer = safeParse(req.body.offer, {});
    let offerToSave = undefined;
    if (offer && offer.isActive && offer.value > 0) {
      offerToSave = {
        type: offer.type || "percentage",
        value: offer.value,
        startDate: offer.startDate || null,
        endDate: offer.endDate || null,
        description: offer.description || "",
        minQuantity: offer.minQuantity || 0,
        maxUses: offer.maxUses || 0,
        usedCount: offer.usedCount || 0,
        isActive: true,
      };
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...rest,
        images,
        image: images[0] || req.body.image || "",
        features: safeParse(req.body.features, []),
        quantity: safeParse(req.body.quantity, []),
        category,
        specifications,
        offer: offerToSave,
      },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res
      .status(500)
      .json({ message: "Failed to update product", error: error.message });
  }
};

// ✅ Delete product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Add review
export const addReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { comment, stars } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(400).json({ message: "User not authenticated" });
    }

    const userId = new mongoose.Types.ObjectId(req.user._id);
    const name = req.user.name;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const alreadyReviewed = product.reviews.find(
      (rev) => rev.userId && rev.userId.equals(userId)
    );

    if (alreadyReviewed) {
      return res
        .status(400)
        .json({ message: "You already reviewed this product" });
    }

    const review = { userId, name, comment, stars };

    product.reviews.push(review);

    product.rating =
      product.reviews.reduce((acc, item) => acc + item.stars, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({
      message: "Review added successfully",
      rating: product.rating,
      reviews: product.reviews,
    });
  } catch (err) {
    console.error("Error adding review:", err);
    res.status(500).json({ message: err.message });
  }
};

export const getRelatedProducts = async (req, res) => {
  try {
 

    const { category, subCategories, excludeId, gender } = req.query;

    if (!category) return res.status(400).json({ message: "Category is required" });

    let excludeObjectId = null;
    if (excludeId) {
      if (!mongoose.Types.ObjectId.isValid(excludeId)) {
        console.warn("Invalid excludeId:", excludeId);
      } else {
        excludeObjectId = new mongoose.Types.ObjectId(excludeId);
      }
    }
    const query = { "category.type": category };
    if (excludeObjectId) query._id = { $ne: excludeObjectId };
    if (gender) query["category.gender"] = gender;
    if (subCategories) {
      const subs = Array.isArray(subCategories)
        ? subCategories
        : [subCategories];
      query["category.subCategories"] = { $in: subs };
    }
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .limit(8)
      .lean();  
    return res.status(200).json(products);
  } catch (err) {
    console.error("Full error stack:", err);
    return res.status(500).json({ message: "Failed to fetch related products", error: err.message });
  }
};

// ✅ Update review
export const updateReview = async (req, res) => {
  try {
    const { productId, reviewId } = req.params;
    const { comment, stars } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const review = product.reviews.id(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (comment) review.comment = comment;
    if (stars) review.stars = stars;

    product.rating =
      product.reviews.reduce((acc, item) => acc + item.stars, 0) /
      product.reviews.length;

    await product.save();

    res.json({
      message: "Review updated successfully",
      rating: product.rating,
      reviews: product.reviews,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete review
export const deleteReview = async (req, res) => {
  try {
    const { productId, reviewId } = req.params;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== reviewId
    );

    product.rating =
      product.reviews.length > 0
        ? product.reviews.reduce((acc, item) => acc + item.stars, 0) /
          product.reviews.length
        : 0;

    await product.save();

    res.json({
      message: "Review deleted successfully",
      rating: product.rating,
      reviews: product.reviews,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
