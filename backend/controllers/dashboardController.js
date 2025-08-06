import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5);
    const topProducts = await Product.find().sort({ rating: -1 }).limit(5);

    res.json({
      stats: {
        totalUsers,
        totalOrders,
        totalProducts,
      },
      recentOrders,
      topProducts,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
