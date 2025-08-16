import Product from "../models/Product.js";

const safeParse = (value, fallback) => {
  try {
    if (typeof value === "string") return JSON.parse(value);
    if (typeof value === "object" && value !== null) return value;
    return fallback;
  } catch {
    return fallback;
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json({ product });
  } catch (err) {
    res.status(404).json({ message: "Product not found" });
  }
};

export const addProduct = async (req, res) => {
  try {
    const images = req.body.images ? JSON.parse(req.body.images) : [];

    const product = new Product({
      name: req.body.name,
      brand: req.body.brand,
      description: req.body.description,
      price: Number(req.body.price),
      stock: Number(req.body.stock),
      features: JSON.parse(req.body.features || "[]"),
      image: images[0] || "",
      images,
      category: JSON.parse(req.body.category || "{}"),
      specifications: JSON.parse(req.body.specifications || "{}"),
      seller: req.body.seller || "admin",
      reviews: JSON.parse(req.body.reviews || "[]"),
      quantity: JSON.parse(req.body.quantity || "[]"),
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

export const updateProduct = async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("Files:", req.files);

    // Use URLs if provided in body
    let images = [];
    if (req.body.images) {
      const parsed = JSON.parse(req.body.images);
      if (Array.isArray(parsed)) {
        images = parsed;
      }
    }

    // Or fall back to uploaded files
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => `/uploads/${file.filename}`);
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        images,
        image: images[0] || req.body.image || "",
        features: safeParse(req.body.features, []),
        quantity: safeParse(req.body.quantity, []),
        category: safeParse(req.body.category, {}),
        specifications: safeParse(req.body.specifications, {}),
        offer: safeParse(req.body.offer, {}),
        reviews: safeParse(req.body.reviews, []),
      },
      { new: true }
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

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Add review
// Add review
export const addReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { comment, stars } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const userId = req.user._id; // extracted from JWT
    const name = req.user.name;

    const alreadyReviewed = product.reviews.find(
      (rev) => rev.userId.toString() === userId.toString()
    );
    if (alreadyReviewed) {
      return res.status(400).json({ message: "You already reviewed this product" });
    }

    product.reviews.push({ userId, name, comment, stars });
    await product.save();

    res.status(201).json({
      message: "Review added successfully",
      rating: product.rating,
      reviews: product.reviews,
    });
  } catch (err) {
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
