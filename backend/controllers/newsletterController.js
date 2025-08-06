import Subscriber from "../models/Subscriber.js";

export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    const existing = await Subscriber.findOne({ email });
    if (existing) return res.status(400).json({ message: "Already subscribed" });

    const subscriber = await Subscriber.create({ email });
    res.status(201).json({ subscriber });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json({ subscribers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
