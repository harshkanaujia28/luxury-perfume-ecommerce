// backend/utils/sendEmail.js
import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {
  // Configure your SMTP transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // e.g., smtp.gmail.com, or your host
    port: 587, // or 465 for SSL
    secure: false, // true if port is 465
    auth: {
      user: process.env.EMAIL_USER, // info@zafrine.in
      pass: process.env.EMAIL_PASS, // SMTP password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};
