import Offer from "../models/Offer.js";
import Product from "../models/Product.js";

export const createOffer = async (req, res) => {
  try {
    const offer = new Offer(req.body);
    await offer.save();

    // Link offer to product
    await Product.findByIdAndUpdate(req.body.product, { offer: offer._id });

    res.status(201).json(offer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find().populate("product", "name price brand");
    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteOffer = async (req, res) => {
  try {
    const { id } = req.params;
    await Offer.findByIdAndDelete(id);
    res.json({ message: "Offer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
