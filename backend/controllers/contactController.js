import ContactMessage from "../models/Contact.js";

export const submitContactMessage = async (req, res) => {
  try {
    const message = await ContactMessage.create(req.body);
    res.status(201).json({ message });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find();
    res.json({ messages });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};