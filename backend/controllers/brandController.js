import Brand from "../models/Brand.js";

export const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json({ brands });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) return res.status(404).json({ message: "Brand not found" });
    res.json({ brand });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addBrand = async (req, res) => {
  try {
    const brand = await Brand.create(req.body);
    res.status(201).json({ brand });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ brand });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteBrand = async (req, res) => {
  try {
    await Brand.findByIdAndDelete(req.params.id);
    res.json({ message: "Brand deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
