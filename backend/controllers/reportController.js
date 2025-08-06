import Report from '../models/Report.js';
import Vendor from '../models/Vendor.js';
import Product from '../models/Product.js';
import Brand from '../models/Brand.js';
import User from '../models/User.js';
import Order from '../models/Order.js';
// import CustomerSegment from '../models/CustomerSegment.js'
// import PaymentStatus from '../models/PaymentStatus.js'

export const getReportData = async (req, res) => {
  try {
    const { range } = req.query;

    const now = new Date();
    let startDate;

    switch (range?.toLowerCase()) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;

      case 'this-week': {
        const dayOfWeek = now.getDay(); 
        const diffToMonday = (dayOfWeek + 6) % 7; 
        startDate = new Date(now);
        startDate.setDate(now.getDate() - diffToMonday);
        startDate.setHours(0, 0, 0, 0);
        break;
      }

      case 'this-month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;

      case 'this-year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;

      default:
        startDate = null; 
    }

    const dateFilter = startDate ? { createdAt: { $gte: startDate } } : {};

    // Apply date filter only where necessary
    const salesData = await Report.find(dateFilter).populate('topUsers.user');
    const vendors = await Vendor.find(); 
    const products = await Product.find();
    const brands = await Brand.find();

    const [totalOrders, totalRevenueAgg, totalUsers, totalProducts] = await Promise.all([
      Order.countDocuments(dateFilter),
      Order.aggregate([
        { $match: dateFilter },
        { $group: { _id: null, total: { $sum: "$total" } } },
      ]),
      User.countDocuments(), 
      Product.countDocuments(),
    ]);

    const overview = {
      totalOrders,
      totalRevenue: totalRevenueAgg[0]?.total || 0,
      totalUsers,
      totalProducts,
    };

    const payments = await Order.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          amount: { $sum: "$total" },
        },
      },
      {
        $project: {
          status: "$_id",
          count: 1,
          amount: 1,
          _id: 0,
        },
      },
    ]);

    res.json({ salesData, vendors, products, brands, overview, payments });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to fetch report data',
      error: err.message,
    });
  }
};