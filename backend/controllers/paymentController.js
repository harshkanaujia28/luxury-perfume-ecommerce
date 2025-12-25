import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { Coupon } from "../models/couponModel.js";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Step 1: Order create
export const createPaymentOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || typeof amount !== "number") {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const options = {
      amount: Math.round(amount * 100), // paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("❌ Razorpay order error:", err.message);
    res.status(500).json({ error: "Failed to create payment order" });
  }
};

// ✅ Step 2: Verify + Save order

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderDetails,
    } = req.body;

    // ✅ Verify signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // ✅ TRUST FRONTEND SNAPSHOT
    const productsWithDetails = orderDetails.products.map((item) => ({
      product: item.product,
      name: item.name,
      brand: item.brand,
      image: item.image,
      price: item.price,               // ✅ discounted price (759.05)
      quantity: item.quantity,
      selectedSize: item.selectedSize,
      offer: item.offer || null,       // ✅ snapshot
    }));

    const itemsTotal = productsWithDetails.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0
    );

    const couponDiscount = orderDetails.couponDiscount || 0;

    const finalTotal = Number(
      (itemsTotal - couponDiscount + (orderDetails.deliveryFee || 0)).toFixed(2)
    );

    const order = new Order({
      user: orderDetails.user,
      customer: orderDetails.customer,
      email: orderDetails.email,
      products: productsWithDetails,
      itemsTotal,
      couponCode: orderDetails.couponCode || null,
      couponType: orderDetails.couponType || null,
      couponValue: orderDetails.couponValue || 0,
      couponDiscount,
      deliveryFee: orderDetails.deliveryFee || 0,
      finalTotal,
      shippingAddress: orderDetails.shippingAddress,
      deliveryTime: orderDetails.deliveryTime || "4-5 days",
      paymentMethod: "Razorpay",
      paymentStatus: "paid",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      status: "pending",
    });

    await order.save();

    // ✅ Stock update ONLY
    for (const item of productsWithDetails) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity } }
      );
    }

    res.status(200).json({
      success: true,
      message: "Payment verified & order placed",
      order,
    });
  } catch (error) {
    console.error("❌ Verification error:", error.message);
    res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};


export const preValidateOrder = async (req, res) => {
  try {
    const { products } = req.body;
    let itemsTotal = 0;

    for (let item of products) {
      const dbProduct = await Product.findById(item.product);

      if (!dbProduct) {
        return res.status(400).json({ message: "Product not found" });
      }

      // ✅ Min Quantity Offer Validation
      if (
        dbProduct.offer?.isActive &&
        item.quantity < dbProduct.offer.minQuantity
      ) {
        return res.status(400).json({
          message: `Minimum quantity ${dbProduct.offer.minQuantity} required for ${dbProduct.name}`,
        });
      }

      // ✅ Stock Validation
      if (item.quantity > dbProduct.stock) {
        return res.status(400).json({
          message: `Only ${dbProduct.stock} units available for ${dbProduct.name}`,
        });
      }

      // ✅ Add totals
      itemsTotal += dbProduct.price * item.quantity;
    }

    res.status(200).json({ success: true, itemsTotal });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
