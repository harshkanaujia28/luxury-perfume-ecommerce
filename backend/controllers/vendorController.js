import Vendor from "../models/Vendor.js";

export const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json({ vendors });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.json({ vendor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addVendor = async (req, res) => {
  try {
    const vendor = await Vendor.create(req.body);
    res.status(201).json({ vendor });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ vendor });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteVendor = async (req, res) => {
  try {
    await Vendor.findByIdAndDelete(req.params.id);
    res.json({ message: "Vendor deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

