import { Coupon } from "../models/couponModel.js"
import order from "../models/Order.js"

// Get all coupons
export const getCoupons = async (req, res) => {
  const coupons = await Coupon.find()
  res.json(coupons)
}

// Get one coupon
export const getCouponById = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) return res.status(404).json({ message: "Coupon not found" });

    // ✅ Count orders where this coupon was applied
    const orders = await Order.find({ couponCode: coupon.code }).select("email customer");

    res.json({
      ...coupon.toObject(),
      usedCount: orders.length, // ✅ overwrite usedCount with real usage
      users: orders.map((o) => ({
        email: o.email,
        customer: o.customer,
      })),
    });
  } catch (error) {
    console.error("Error fetching coupon:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new coupon
export const createCoupon = async (req, res) => {
  const newCoupon = new Coupon(req.body)
  const saved = await newCoupon.save()
  res.status(201).json(saved)
}

// Update coupon
export const updateCoupon = async (req, res) => {
  const updated = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!updated) return res.status(404).json({ message: "Coupon not found" })
  res.json(updated)
}

// Delete coupon
export const deleteCoupon = async (req, res) => {
  const deleted = await Coupon.findByIdAndDelete(req.params.id)
  if (!deleted) return res.status(404).json({ message: "Coupon not found" })
  res.json({ message: "Coupon deleted" })
}

export const validateCouponByCode = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ valid: false, message: "Coupon code is required" });
    }

    const coupon = await Coupon.findOne({ code });

    if (!coupon) {
      return res.status(404).json({ valid: false, message: "Coupon not found" });
    }

    return res.status(200).json({
      valid: true,
      value: coupon.value, // ✅ use correct field here
      type: coupon.type,   // optional: send type like "Percentage"
    });
  } catch (error) {
    console.error("Coupon validation error:", error);
    res.status(500).json({ valid: false, message: "Server error" });
  }
};
