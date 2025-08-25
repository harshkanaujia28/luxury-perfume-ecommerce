// backend/utils/sendEmail.js
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async (to, subject, html) => {
  const msg = {
    to,
    from: process.env.EMAIL_USER,  // your verified sender
    subject,
    html,
  };

  await sgMail.send(msg);
};
