// backend/utils/sendEmail.js
import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {
  try {
    // Create SMTP transporter for Google Workspace
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,          // TLS port
      secure: false,      // false for port 587
      auth: {
        user: process.env.EMAIL_USER, // info@zafrine.in
        pass: process.env.EMAIL_PASS, // app password
      },
    });

    const mailOptions = {
      from: `"Zafrine" <${process.env.EMAIL_USER}>`, // show name + email
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email could not be sent");
  }
};
