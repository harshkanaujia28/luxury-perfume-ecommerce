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
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const newImages =
      req.files?.map((file) => `/uploads/${file.filename}`) || [];

    const updatedFields = {
      name: req.body.name || product.name,
      brand: req.body.brand || product.brand,
      brandimage: req.body.brandimage || product.brandimage,
      description: req.body.description || product.description,
      price: req.body.price || product.price,
      stock: req.body.stock || product.stock,
      category: safeParse(req.body.category, product.category),
      specifications: safeParse(
        req.body.specifications,
        product.specifications
      ),
      features: safeParse(req.body.features, product.features), // ✅ ADD THIS LINE
      seller: req.body.seller || product.seller,
      rating: Number(req.body.rating) || product.rating,
      reviews: safeParse(req.body.reviews, product.reviews),
      offer: safeParse(req.body.offer, product.offer),
      quantity: safeParse(req.body.quantity, product.quantity), // ✅ ADD THIS
      images: newImages.length > 0 ? newImages : product.images,
      image: newImages.length > 0 ? newImages[0] : product.image,
    };

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      {
        new: true,
      }
    );

    res.json({ product: updatedProduct });
  } catch (error) {
    console.error("Update error:", error);
    res.status(400).json({ message: error.message });
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
