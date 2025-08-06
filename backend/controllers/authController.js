import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"



export const register = async (req, res) => {
  try { 
    const { name, email, password,role } = req.body
    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashed , role})
    res.status(201).json({ user })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, { httpOnly: true })
    res.json({ user, token, role: user.role })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    res.json({ user })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
};


export const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, city, state, country, password } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.city = city || user.city;
    user.state = state || user.state;
    user.country = country || user.country;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    const updatedUser = await User.findById(user._id).select("-password");
    res.json({ user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

