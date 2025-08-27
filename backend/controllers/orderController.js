import Order from "../models/Order.js";
import ReturnRequest from "../models/Return.js";
import { Coupon } from "../models/couponModel.js";

export const placeOrder = async (req, res) => {
  try {
    const { _id, name, email } = req.user;
    const { products, total, status, shippingAddress, couponCode } = req.body;

    // 🔒 Optional: Check coupon usage limit
    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode });
      if (!coupon) return res.status(400).json({ message: "Invalid coupon" });

      if (coupon.expiry && new Date() > coupon.expiry) {
        return res.status(400).json({ message: "Coupon expired" });
      }

      if (coupon.usedCount >= coupon.totalLimit) {
        return res.status(400).json({ message: "Coupon usage limit reached" });
      }

      if (total < coupon.minOrder) {
        return res
          .status(400)
          .json({ message: `Minimum order amount is ${coupon.minOrder}` });
      }

      const userOrders = await Order.find({ user: _id, couponCode });
      if (userOrders.length >= coupon.perUserLimit) {
        return res
          .status(400)
          .json({ message: "You have already used this coupon" });
      }
    }

    const orderData = {
      user: _id,
      customer: name,
      email,
      products,
      total,
      status,
      shippingAddress,
      couponCode,
    };

    const order = await Order.create(orderData);

    // 📈 Increment usedCount
    if (couponCode) {
      await Coupon.findOneAndUpdate(
        { code: couponCode },
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
export const getRevenue = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $match: { status: "delivered" }, // Only delivered orders count as revenue
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$total" },
        },
      },
    ]);

    const revenue = result[0]?.totalRevenue || 0;

    res.json({ revenue, currency: "INR" });
  } catch (err) {
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
      return res
        .status(400)
        .json({
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
