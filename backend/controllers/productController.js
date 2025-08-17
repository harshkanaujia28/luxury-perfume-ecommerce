import mongoose from "mongoose";
import Product from "../models/Product.js";

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
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get single product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ product });
  } catch (err) {
    res.status(404).json({ message: "Product not found" });
  }
};

// ✅ Add product
export const addProduct = async (req, res) => {
  try {
    const images = safeParse(req.body.images, []);

    const product = new Product({
      name: req.body.name,
      brand: req.body.brand,
      brandimage: req.body.brandimage || "",
      description: req.body.description,
      price: Number(req.body.price),
      originalPrice: req.body.originalPrice || null,
      stock: Number(req.body.stock),
      features: safeParse(req.body.features, []),
      image: images[0] || "",
      images,
      category: safeParse(req.body.category, {}),
      specifications: safeParse(req.body.specifications, {}),
      quantity: safeParse(req.body.quantity, []),
      offer: safeParse(req.body.offer, {}),
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res
      .status(500)
      .json({ message: "Failed to add product", error: error.message });
  }
};

// ✅ Update product (⚠️ excludes reviews & rating updates here)
export const updateProduct = async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("Files:", req.files);

    let images = [];

    // Prefer body images
    if (req.body.images) {
      const parsed = safeParse(req.body.images, []);
      if (Array.isArray(parsed)) {
        images = parsed;
      }
    }

    // Fallback to uploaded files
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => `/uploads/${file.filename}`);
    }

    // Exclude reviews and rating from updates
    const { reviews, rating, ...rest } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...rest,
        images,
        image: images[0] || req.body.image || "",
        features: safeParse(req.body.features, []),
        quantity: safeParse(req.body.quantity, []),
        category: safeParse(req.body.category, {}),
        specifications: safeParse(req.body.specifications, {}),
        offer: safeParse(req.body.offer, {}),
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
