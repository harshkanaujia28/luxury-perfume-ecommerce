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

    if (!["COD", "Razorpay"].includes(paymentMethod)) {
      return res.status(400).json({ message: "Invalid payment method" });
    }

    let subtotal = 0;
    let totalQuantity = 0;
    const processedProducts = [];

<<<<<<< HEAD
    // ✅ 1️⃣ BEFORE processing, check stock for all products
    for (const item of products) {
      const dbProduct = await Product.findById(item.product);

      if (!dbProduct) {
        return res.status(400).json({ message: `Product not found: ${item.product}` });
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
=======
    // 1️⃣ Process products & apply product-level offers
    for (const item of products) {
      const dbProduct = await Product.findById(item.product);
      if (!dbProduct)
        return res
          .status(400)
          .json({ message: `Product not found: ${item.product}` });
>>>>>>> 870ac2dc463bca530259de0733b88cb90ffbc989

      let price = dbProduct.price;
      let discountApplied = 0;
      let offerSnapshot = {
        isActive: false,
        type: null,
        value: 0,
        discountApplied: 0,
      };

      totalQuantity += item.quantity;

      if (dbProduct.offer && dbProduct.offer.isActive) {
<<<<<<< HEAD
=======
        // ✅ minQuantity check
>>>>>>> 870ac2dc463bca530259de0733b88cb90ffbc989
        if (item.quantity < (dbProduct.offer.minQuantity || 1)) {
          return res.status(400).json({
            message: `Minimum quantity ${dbProduct.offer.minQuantity} required for offer on ${dbProduct.name}`,
          });
        }

<<<<<<< HEAD
=======
        // ✅ discount calc
>>>>>>> 870ac2dc463bca530259de0733b88cb90ffbc989
        if (dbProduct.offer.type === "percentage") {
          discountApplied = (price * dbProduct.offer.value) / 100;
        } else if (["fixed", "flat"].includes(dbProduct.offer.type)) {
          discountApplied = dbProduct.offer.value;
        }

<<<<<<< HEAD
=======
        // ✅ snapshot for order record
>>>>>>> 870ac2dc463bca530259de0733b88cb90ffbc989
        offerSnapshot = {
          isActive: true,
          type: dbProduct.offer.type,
          value: dbProduct.offer.value,
          discountApplied,
        };

<<<<<<< HEAD
        dbProduct.offer.usedCount = (dbProduct.offer.usedCount || 0) + 1;

        if (dbProduct.offer.maxUses && dbProduct.offer.usedCount >= dbProduct.offer.maxUses) {
          dbProduct.offer.isActive = false;
        }

=======
        // ✅ usage update
        dbProduct.offer.usedCount = (dbProduct.offer.usedCount || 0) + 1;
        if (
          dbProduct.offer.maxUses &&
          dbProduct.offer.usedCount >= dbProduct.offer.maxUses
        ) {
          dbProduct.offer.isActive = false;
        }
>>>>>>> 870ac2dc463bca530259de0733b88cb90ffbc989
        await dbProduct.save();
      }

      subtotal += (price - discountApplied) * item.quantity;

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

<<<<<<< HEAD
=======
    // 2️⃣ Delivery fee & time
>>>>>>> 870ac2dc463bca530259de0733b88cb90ffbc989
    let deliveryFee = 0;
    let deliveryTime = null;
    const zone = await Zone.findOne({ pincode: shippingAddress.zipCode });
    if (zone) {
      deliveryFee = zone.deliveryFee;
      deliveryTime = zone.deliveryTime;
    }

<<<<<<< HEAD
=======
    // 3️⃣ Apply coupon
>>>>>>> 870ac2dc463bca530259de0733b88cb90ffbc989
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
<<<<<<< HEAD
        return res.status(400).json({
          message: `Minimum order amount is ${appliedCoupon.minOrder}`,
        });

      if (appliedCoupon.minQuantity && totalQuantity < appliedCoupon.minQuantity)
        return res.status(400).json({
          message: `Minimum ${appliedCoupon.minQuantity} items required to use this coupon`,
        });

      const userOrders = await Order.find({ user: userId, couponCode });
      if (userOrders.length >= appliedCoupon.perUserLimit)
        return res.status(400).json({ message: "You have already used this coupon" });
=======
        return res
          .status(400)
          .json({
            message: `Minimum order amount is ${appliedCoupon.minOrder}`,
          });

      if (
        appliedCoupon.minQuantity &&
        totalQuantity < appliedCoupon.minQuantity
      )
        return res
          .status(400)
          .json({
            message: `Minimum ${appliedCoupon.minQuantity} items required to use this coupon`,
          });

      const userOrders = await Order.find({ user: userId, couponCode });
      if (userOrders.length >= appliedCoupon.perUserLimit)
        return res
          .status(400)
          .json({ message: "You have already used this coupon" });
>>>>>>> 870ac2dc463bca530259de0733b88cb90ffbc989

      if (appliedCoupon.type.toLowerCase() === "percentage") {
        couponDiscount = (subtotal * appliedCoupon.value) / 100;
      } else {
        couponDiscount = appliedCoupon.value;
      }
    }

<<<<<<< HEAD
    const TAX_RATE = 0.1;
    const taxableAmount = subtotal - couponDiscount;
    const taxAmount = Math.round(taxableAmount * TAX_RATE * 100) / 100;

    let finalTotal = taxableAmount + taxAmount + deliveryFee;
    finalTotal = Math.round(finalTotal * 100) / 100;

    const activeOfferProduct = processedProducts.find((p) => p.offer?.isActive);
    const activeOfferId = activeOfferProduct ? activeOfferProduct.product : null;

=======
    // 4️⃣ Tax calculation AFTER offers & coupon
    const TAX_RATE = 0.1; // 10%
    const taxableAmount = subtotal - couponDiscount;
    const taxAmount = Math.round(taxableAmount * TAX_RATE * 100) / 100;

    // 5️⃣ Final total
    let finalTotal = taxableAmount + taxAmount + deliveryFee;
    finalTotal = Math.round(finalTotal * 100) / 100;

    // 6️⃣ Active offer product ID
    const activeOfferProduct = processedProducts.find((p) => p.offer?.isActive);
    const activeOfferId = activeOfferProduct
      ? activeOfferProduct.product
      : null;

    // 7️⃣ Create order
>>>>>>> 870ac2dc463bca530259de0733b88cb90ffbc989
    const orderData = {
      user: userId,
      customer: name,
      email,
      products: processedProducts,
      shippingAddress,
      itemsTotal: Math.round(subtotal * 100) / 100,
      deliveryFee,
      deliveryTime,
      taxAmount,
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

<<<<<<< HEAD
    // ✅ 3️⃣ After order created → reduce stock
    for (const item of products) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity } },
        { new: true }
      );
    }

=======
    // 8️⃣ Increment coupon usage
>>>>>>> 870ac2dc463bca530259de0733b88cb90ffbc989
    if (appliedCoupon) {
      await Coupon.updateOne(
        { _id: appliedCoupon._id },
        { $inc: { usedCount: 1 } }
      );
    }

<<<<<<< HEAD
    try {
      const html = getOrderEmailTemplate(order);
      await sendEmail(process.env.ADMIN_EMAIL, `🛒 New Order #${order._id}`, html);
=======
    // 9️⃣ Send email to admin AFTER coupon update
    try {
      const html = getOrderEmailTemplate(order);
      await sendEmail(
        process.env.ADMIN_EMAIL,
        `🛒 New Order #${order._id}`,
        html
      );
>>>>>>> 870ac2dc463bca530259de0733b88cb90ffbc989
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

<<<<<<< HEAD

=======
>>>>>>> 870ac2dc463bca530259de0733b88cb90ffbc989
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
