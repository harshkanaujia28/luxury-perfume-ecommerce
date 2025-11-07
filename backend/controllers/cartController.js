import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";

// ✅ GET /api/cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate("items.product");

    if (!cart) {
      return res.json({ items: [] });
    }

    res.json({ items: cart.items });
  } catch (err) {
    console.error("❌ Get Cart Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};


// ✅ POST /api/cart/add
export const addToCart = async (req, res) => {
const { productId, quantity, selectedSize, price } = req.body;

  if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid or missing productId" });
  }

  try {
    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = new Cart({
        userId: req.user._id,
        items: [{ product: productId, quantity, selectedSize, price, }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) =>
          item.product && item.product.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity;
         existingItem.price = price;
      } else {
        cart.items.push({ product: productId, quantity, selectedSize, price, });
      }
    }
    console.log("Adding to cart with:", {
  id: productId,
  quantity,
  selectedSize,
  price,
});


    await cart.save();
    const populated = await cart.populate("items.product");
    res.json({ items: populated.items });
  } catch (err) {
    console.error("🔥 Add to cart error:", err);
    res.status(500).json({ message: "Server error" });
  }
};




// ✅ POST /api/cart/remove
export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.body;

    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item._id.toString() !== id);
    await cart.save();

    res.json({ items: cart.items });
  } catch (err) {
    console.error("❌ Remove from Cart Error:", err);
    res.status(400).json({ message: err.message });
  }
};


// ✅ PUT /api/cart/update
export const updateCartItem = async (req, res) => {
  try {
    const { id, quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((item) => item._id.toString() === id);
    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    item.quantity = Number(quantity);
    if (item.quantity <= 0) {
      cart.items = cart.items.filter((i) => i._id.toString() !== id);
    }

    await cart.save();
    const populated = await cart.populate("items.product");
    res.json({ items: populated.items });
  } catch (err) {
    console.error("❌ Update Cart Error:", err);
    res.status(400).json({ message: err.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) return res.json({ items: [] });

    cart.items = [];
    await cart.save();

    res.json({ items: [] });
  } catch (err) {
    console.error("❌ Clear Cart Error:", err);
    res.status(500).json({ message: "Failed to clear cart" });
  }
};