import Order from "../models/Order.js";
import ReturnRequest from "../models/Return.js";
import { Coupon } from "../models/couponModel.js";
import Zone from "../models/Zone.js";
import Offer from "../models/Offer.js";
import Product from "../models/Product.js";
import { getOrderEmailTemplate } from "../utils/emailTemplates.js";
import { sendEmail } from "../utils/sendEmail.js";

export const placeOrder = async (req, res) => {
  try {
    const { _id: userId, name, email } = req.user;
    const { products, shippingAddress, couponCode, paymentMethod } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "No products in order" });
    }

    if (paymentMethod !== "Razorpay") {
      return res.status(400).json({
        message: "Only Razorpay payments are allowed",
      });
    }

    let subtotal = 0;
    let totalQuantity = 0;
    const processedProducts = [];

    // ✅ 1️⃣ BEFORE processing, check stock for all products
    for (const item of products) {
      const dbProduct = await Product.findById(item.product);

      if (!dbProduct) {
        return res
          .status(400)
          .json({ message: `Product not found: ${item.product}` });
      }

      if (dbProduct.stock < item.quantity) {
        return res.status(400).json({
          message: `${dbProduct.name} is out of stock. Only ${dbProduct.stock} left`,
        });
      }
    }

    // ✅ 2️⃣ Now continue original logic — untouched
    for (const item of products) {
      const dbProduct = await Product.findById(item.product);
      const price = item.price;

      totalQuantity += item.quantity;

      // ✅ snapshot only (NO recalculation)
      let offerSnapshot = null;
      if (dbProduct.offer && dbProduct.offer.isActive) {
        offerSnapshot = {
          isActive: true,
          type: dbProduct.offer.type,
          value: dbProduct.offer.value,
          discountApplied: 0, // already applied in frontend price
        };
      }

      // ✅ subtotal uses frontend price
      subtotal += price * item.quantity;

      processedProducts.push({
        product: dbProduct._id,
        name: dbProduct.name,
        price,
        brand: dbProduct.brand,
        image: dbProduct.image,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        offer: offerSnapshot,
      });
    }

    let deliveryFee = 0;
    let deliveryTime = null;
    const zone = await Zone.findOne({ pincode: shippingAddress.zipCode });
    if (zone) {
      deliveryFee = zone.deliveryFee;
      deliveryTime = zone.deliveryTime;
    }

    let appliedCoupon = null;
    let couponDiscount = 0;
    if (couponCode) {
      appliedCoupon = await Coupon.findOne({ code: couponCode });
      if (!appliedCoupon)
        return res.status(400).json({ message: "Invalid coupon" });

      if (appliedCoupon.expiry && new Date() > appliedCoupon.expiry)
        return res.status(400).json({ message: "Coupon expired" });

      if (appliedCoupon.usedCount >= appliedCoupon.totalLimit)
        return res.status(400).json({ message: "Coupon usage limit reached" });

      if (appliedCoupon.minOrder && subtotal < appliedCoupon.minOrder)
        return res.status(400).json({
          message: `Minimum order amount is ${appliedCoupon.minOrder}`,
        });

      if (
        appliedCoupon.minQuantity &&
        totalQuantity < appliedCoupon.minQuantity
      )
        return res.status(400).json({
          message: `Minimum ${appliedCoupon.minQuantity} items required to use this coupon`,
        });

      const userOrders = await Order.find({ user: userId, couponCode });
      if (userOrders.length >= appliedCoupon.perUserLimit)
        return res
          .status(400)
          .json({ message: "You have already used this coupon" });

      if (appliedCoupon.type.toLowerCase() === "percentage") {
        couponDiscount = (subtotal * appliedCoupon.value) / 100;
      } else {
        couponDiscount = appliedCoupon.value;
      }
    }

    const finalTotal =
      Math.round((subtotal - couponDiscount + deliveryFee) * 100) / 100;

    const activeOfferProduct = processedProducts.find((p) => p.offer?.isActive);
    const activeOfferId = activeOfferProduct
      ? activeOfferProduct.product
      : null;

    const orderData = {
      user: userId,
      customer: name,
      email,
      products: processedProducts,
      shippingAddress,
      itemsTotal: Math.round(subtotal * 100) / 100,
      deliveryFee,
      deliveryTime,
      discount: Math.round(couponDiscount * 100) / 100,
      finalTotal,
      couponCode: appliedCoupon ? appliedCoupon.code : null,
      couponType: appliedCoupon ? appliedCoupon.type : null,
      couponValue: appliedCoupon ? appliedCoupon.value : 0,
      couponDiscount: Math.round(couponDiscount * 100) / 100,
      activeOffer: activeOfferId,
      paymentMethod,
      status: "pending",
    };

    const order = await Order.create(orderData);

    // ✅ 3️⃣ After order created → reduce stock
    for (const item of products) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity } },
        { new: true }
      );
    }

    if (appliedCoupon) {
      await Coupon.updateOne(
        { _id: appliedCoupon._id },
        { $inc: { usedCount: 1 } }
      );
    }

    try {
      const html = getOrderEmailTemplate(order);
      await sendEmail(
        process.env.ADMIN_EMAIL,
        `🛒 New Order #${order._id}`,
        html
      );
      console.log("✅ Admin notified about new order");
    } catch (err) {
      console.error("❌ Failed to send order notification:", err.message);
    }

    res.status(201).json(order);
  } catch (err) {
    console.error("❌ Order creation failed:", err.message);
    res.status(400).json({ message: err.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;

    // Validate Mongo ID
    if (!orderId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid order ID format" });
    }

    const order = await Order.findById(orderId)
      .populate("products.product")
      .populate("user", "name email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (err) {
    console.error("❌ Error in getOrderById:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const trackOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const requestReturn = async (req, res) => {
  try {
    const { name, email, id: userId } = req.user;
    const orderId = req.params.id; // ✅ Grab the orderId from route
    const { reason, items, totalRefund, returnMethod } = req.body;

    const newRequest = new ReturnRequest({
      customer: name,
      email,
      user: userId, // Optional, if your schema supports `user`
      orderId, // ✅ Add this to fix the validation error
      reason,
      items,
      totalRefund,
      returnMethod,
    });

    await newRequest.save();

    res
      .status(201)
      .json({ message: "Return request submitted", request: newRequest });
  } catch (err) {
    console.error("❌ Return request failed:", err);
    res.status(500).json({ message: err.message });
  }
};

// ✅ Admin - Update order status
export const updateOrderStatusByAdmin = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 🟢 Update status
    order.status = status;

    // 🟡 Auto-update paymentStatus if COD + Delivered
    if (
      status === "delivered" &&
      order.paymentMethod === "COD" &&
      order.paymentStatus === "pending"
    ) {
      order.paymentStatus = "paid";
    }

    await order.save();

    res.json({ message: "Order status updated successfully", order });
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(400).json({ message: err.message });
  }
};
// make sure correct path
// GET /admin/orders/revenue
export const getRevenue = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $match: {
          paymentStatus: "paid", // ✅ बस ये check रखना है
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$finalTotal" }, // sum of finalTotal
          totalOrders: { $sum: 1 }, // count paid orders
        },
      },
    ]);

    const revenue = result[0] || { totalRevenue: 0, totalOrders: 0 };

    res.json({
      totalRevenue: revenue.totalRevenue,
      totalOrders: revenue.totalOrders,
      currency: "INR",
    });
  } catch (err) {
    console.error("Revenue fetch failed:", err.message);
    res.status(500).json({ message: err.message });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "products.product"
    ); // ✅ this populates full product info

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Failed to fetch user orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// PATCH /orders/:id/cancel
export const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Prevent cancelling delivered or already cancelled orders
    if (["delivered", "cancelled"].includes(order.status)) {
      return res.status(400).json({
        message: `Order cannot be cancelled. Current status: ${order.status}`,
      });
    }

    order.status = "cancelled";
    await order.save();

    res.status(200).json({ message: "Order cancelled successfully", order });
  } catch (err) {
    console.error("Cancel Order Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await Order.findByIdAndDelete(orderId);

    res.status(200).json({ message: "Order deleted successfully", orderId });
  } catch (err) {
    console.error("❌ Delete order failed:", err.message);
    res.status(500).json({ message: err.message });
  }
};
