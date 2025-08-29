import Order from "../models/Order.js";
import ReturnRequest from "../models/Return.js";
import { Coupon } from "../models/couponModel.js";
import Zone from "../models/Zone.js";
import Offer from "../models/Offer.js";
import Product from "../models/Product.js";

export const placeOrder = async (req, res) => {
  try {
    const { _id: userId, name, email } = req.user;
    const { products, shippingAddress, couponCode } = req.body;

    let itemsTotal = 0;
    let totalQuantity = 0;
    const processedProducts = [];

    // 1️⃣ Process each product
    for (const item of products) {
      const dbProduct = await Product.findById(item.product);
      if (!dbProduct) {
        return res
          .status(400)
          .json({ message: `Product not found: ${item.product}` });
      }

      let price = dbProduct.price;
      let offerSnapshot = {
        isActive: false,
        type: null,
        value: 0,
        discountApplied: 0,
      };

      totalQuantity += item.quantity;

      // ✅ Apply product-level offer if active
      let discountApplied = 0;
      if (dbProduct.offer && dbProduct.offer.isActive) {
        if (item.quantity < (dbProduct.offer.minQuantity || 1)) {
          return res.status(400).json({
            message: `Minimum quantity ${dbProduct.offer.minQuantity} required to apply offer on ${dbProduct.name}`,
          });
        }

        if (dbProduct.offer.type === "percentage") {
          discountApplied = (price * item.quantity * dbProduct.offer.value) / 100;
        } else if (dbProduct.offer.type === "fixed" || dbProduct.offer.type === "flat") {
          discountApplied = dbProduct.offer.value * item.quantity; // multiply by quantity
        }

        offerSnapshot = {
          isActive: true,
          type: dbProduct.offer.type,
          value: dbProduct.offer.value,
          discountApplied,
        };
      }

      itemsTotal += price * item.quantity - discountApplied;

      processedProducts.push({
        ...item,
        product: dbProduct._id,
        name: dbProduct.name,
        price: dbProduct.price,
        brand: dbProduct.brand,
        image: dbProduct.image,
        offer: offerSnapshot,
      });
    }

    // 2️⃣ Delivery fee & time
    let deliveryFee = 0;
    let deliveryTime = null;
    const zone = await Zone.findOne({ pincode: shippingAddress.zipCode });
    if (zone) {
      deliveryFee = zone.deliveryFee;
      deliveryTime = zone.deliveryTime;
    }

    // 3️⃣ Coupon validation & discount
    let appliedCoupon = null;
    let couponDiscount = 0;
    if (couponCode) {
      appliedCoupon = await Coupon.findOne({ code: couponCode });
      if (!appliedCoupon) return res.status(400).json({ message: "Invalid coupon" });

      if (appliedCoupon.expiry && new Date() > appliedCoupon.expiry) {
        return res.status(400).json({ message: "Coupon expired" });
      }

      if (appliedCoupon.usedCount >= appliedCoupon.totalLimit) {
        return res.status(400).json({ message: "Coupon usage limit reached" });
      }

      if (itemsTotal < appliedCoupon.minOrder) {
        return res.status(400).json({
          message: `Minimum order amount is ${appliedCoupon.minOrder}`,
        });
      }

      if (appliedCoupon.minQuantity && totalQuantity < appliedCoupon.minQuantity) {
        return res.status(400).json({
          message: `Minimum ${appliedCoupon.minQuantity} items required to use this coupon`,
        });
      }

      const userOrders = await Order.find({ user: userId, couponCode });
      if (userOrders.length >= appliedCoupon.perUserLimit) {
        return res.status(400).json({ message: "You have already used this coupon" });
      }

      // ✅ Calculate coupon discount
      if (appliedCoupon.type.toLowerCase() === "percentage") {
        couponDiscount = (itemsTotal * appliedCoupon.value) / 100;
      } else {
        couponDiscount = appliedCoupon.value;
      }
    }

    // 4️⃣ Tax
    const TAX_RATE = 0.1; // 10%
    const taxAmount = itemsTotal * TAX_RATE;

    // 5️⃣ Final total
    let finalTotal = itemsTotal + taxAmount + deliveryFee - couponDiscount;
    finalTotal = Math.round(finalTotal * 100) / 100; // round to 2 decimals

    // 6️⃣ Active offer product ID
    const activeOfferProduct = processedProducts.find((p) => p.offer?.isActive);
    const activeOfferId = activeOfferProduct ? activeOfferProduct.product : null;

    // 7️⃣ Create order
    const orderData = {
      user: userId,
      customer: name,
      email,
      products: processedProducts,
      shippingAddress,
      couponCode: appliedCoupon ? appliedCoupon.code : null,
      itemsTotal: Math.round(itemsTotal * 100) / 100,
      deliveryFee,
      deliveryTime,
      taxAmount: Math.round(taxAmount * 100) / 100,
      discount: Math.round(couponDiscount * 100) / 100,
      finalTotal,
      activeOffer: activeOfferId,
      status: "pending",
    };

    const order = await Order.create(orderData);

    // 8️⃣ Increment coupon usage
    if (appliedCoupon) {
      await Coupon.updateOne(
        { _id: appliedCoupon._id },
        { $inc: { usedCount: 1 } }
      );
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

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order status updated", order });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// GET /admin/orders/revenue
; // make sure correct path

export const getRevenue = async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $match: { status: "delivered" } }, // Only delivered orders
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$finalTotal" }, // sum of finalTotal
          totalOrders: { $sum: 1 },             // count delivered orders
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
