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

    // ✅ Verify Razorpay signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }

    let itemsTotal = 0;
    let totalDiscount = 0;

    // ✅ Map products and calculate offer per product
    const productsWithDetails = await Promise.all(
      orderDetails.products.map(async (item) => {
        const dbProduct = await Product.findById(item.product);
        if (!dbProduct) throw new Error(`Product ${item.product} not found`);

        let discountApplied = 0;
        if (dbProduct.offer?.isActive) {
          if (item.quantity < (dbProduct.offer.minQuantity || 1)) {
            throw new Error(
              `Minimum quantity ${dbProduct.offer.minQuantity} required for ${dbProduct.name}`
            );
          }
          if (dbProduct.offer.type === "percentage") {
            discountApplied =
              ((dbProduct.price * dbProduct.offer.value) / 100) * item.quantity;
          } else if (["flat", "fixed"].includes(dbProduct.offer.type)) {
            discountApplied = dbProduct.offer.value * item.quantity;
          }
        }

        const subtotal = dbProduct.price * item.quantity;
        itemsTotal += subtotal;
        totalDiscount += discountApplied;

        return {
          product: dbProduct._id,
          quantity: item.quantity,
          selectedSize: item.selectedSize,
          name: dbProduct.name,
          brand: dbProduct.brand,
          price: dbProduct.price,
          image: dbProduct.image,
          offer: {
            isActive: !!dbProduct.offer?.isActive,
            type: dbProduct.offer?.type || null,
            value: dbProduct.offer?.value || 0,
            discountApplied,
          },
          subtotalAfterOffer: subtotal - discountApplied,
        };
      })
    );

    // ✅ Coupon discount applied **after offers**
    let couponDiscount = 0;
    if (orderDetails.couponType && orderDetails.couponValue) {
      const subtotalAfterOffer = itemsTotal - totalDiscount;
      if (orderDetails.couponType === "Percentage") {
        couponDiscount = (subtotalAfterOffer * orderDetails.couponValue) / 100;
      } else if (["Flat", "Fixed"].includes(orderDetails.couponType)) {
        couponDiscount = orderDetails.couponValue;
      }
    }

    // ✅ Tax (10% on subtotal after offer and coupon)
    const taxableAmount = itemsTotal - totalDiscount - couponDiscount;
    const taxAmount = parseFloat((taxableAmount * 0.1).toFixed(2));

    // ✅ Final Total
    const finalTotal = parseFloat(
      (taxableAmount + taxAmount + (orderDetails.deliveryFee || 0)).toFixed(2)
    );

    // ✅ Save order in DB
    const order = new Order({
      user: orderDetails.user,
      customer: orderDetails.customer,
      email: orderDetails.email,
      products: productsWithDetails,
      itemsTotal,
      discount: totalDiscount,
      couponCode: orderDetails.couponCode || null,
      couponType: orderDetails.couponType || null,
      couponValue: orderDetails.couponValue || 0,
      couponDiscount,
      taxAmount,
      deliveryFee: orderDetails.deliveryFee || 0,
      finalTotal,
      activeOffer: orderDetails.activeOffer || null,
      shippingAddress: orderDetails.shippingAddress,
      deliveryTime: orderDetails.deliveryTime || "1-2 days",
      paymentMethod: "Razorpay",
      paymentStatus: "paid",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      status: "pending",
    });

    await order.save();

    // ✅ Update stock & offer usage
    for (const item of productsWithDetails) {
      const dbProduct = await Product.findById(item.product);

      if (!dbProduct) continue;

      // Stock decrement
      dbProduct.stock = Math.max(0, dbProduct.stock - item.quantity);

      // Offer usage increment
      if (dbProduct.offer?.isActive) {
        dbProduct.offer.usedCount =
          (dbProduct.offer.usedCount || 0) + item.quantity;

        if (
          dbProduct.offer.maxUses &&
          dbProduct.offer.usedCount >= dbProduct.offer.maxUses
        ) {
          dbProduct.offer.isActive = false;
        }
      }

      await dbProduct.save();
       console.log("Offer used count updated:", dbProduct.offer.usedCount);
    }
   



    res.status(200).json({
      success: true,
      message: "Payment verified and order placed successfully",
      order,
    });
  } catch (error) {
    console.error("❌ Verification error:", error.message);
    res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: error.message,
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
