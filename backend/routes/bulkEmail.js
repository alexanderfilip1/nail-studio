const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const db = require("../config/db");

const transporter = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmailWithDelay = async (
  users,
  subject,
  htmlContent,
  delay = 1000
) => {
  for (const user of users) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: subject,
      html: htmlContent,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${user.email}`);
    } catch (err) {
      if (err.responseCode === 550) {
        console.log(`Skipping non-existent email: ${user.email}`);
      } else {
        console.error(`Failed to send email to ${user.email}:`, err);
      }
    }

    await new Promise((resolve) => setTimeout(resolve, delay));
  }
};

router.post("/send-bulk-email", async (req, res) => {
  const { subject, htmlContent } = req.body;

  try {
    const [users] = await db.query("SELECT email FROM users");
    await sendEmailWithDelay(users, subject, htmlContent, 1000);

    res
      .status(200)
      .json({ status: "success", message: "Emails sent successfully!" });
  } catch (err) {
    console.error("Error sending emails:", err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

module.exports = router;
