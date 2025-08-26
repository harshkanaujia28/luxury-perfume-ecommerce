import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role });
    res.status(201).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Forgot Password Handler
// Forgot Password Handler
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
    
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const FRONTEND_URL =
      process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";
    const resetLink = `${FRONTEND_URL}/reset-password/${token}`;
    await sendEmail(
      user.email,
      "Zafrine Password Reset Request",
      `<p>Hello ${user.name || "User"},</p>
       <p>We received a request to reset your password. Click the link below to proceed:</p>
       <p><a href="${resetLink}">Reset Password</a></p>
       <p>This link will expire in 1 hour. If you did not request a password reset, please ignore this email.</p>
       <p>— The Zafrine Team</p>`
    );
  res
      .status(200)
      .json({ status: "success", message: "Reset link sent to your email" });
  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

// Reset Password Handler
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  console.log(`[Reset Password] Request received with token: ${token}`);

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      console.log(`[Reset Password] No user found for token: ${token}`);
      return res.status(404).json({
        status: "error",
        message: "User not found. Please request a new password reset.",
      });
    }

    // Hash the new password and save
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    console.log(`[Reset Password] Password successfully reset for: ${user.email}`);

    // Respond to frontend so it can redirect to login
    return res.status(200).json({
      status: "success",
      message: "Password has been reset successfully. You can now log in.",
    });
  } catch (err) {
    console.error("[Reset Password] Error:", err);

    const message =
      err.name === "TokenExpiredError"
        ? "The reset link has expired. Please request a new one."
        : "Invalid reset link. Please request a new password reset.";

    return res.status(400).json({
      status: "error",
      message,
    });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res.cookie("token", token, { httpOnly: true });
    res.json({ user, token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
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
