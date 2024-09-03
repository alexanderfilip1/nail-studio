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

router.post("/send-bulk-email", async (req, res) => {
  const { subject, htmlContent } = req.body;

  try {
    const [users] = await db.query("SELECT email FROM users");

    for (const user of users) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: subject,
        html: htmlContent,
      };

      await transporter.sendMail(mailOptions);
    }

    res
      .status(200)
      .json({ status: "success", message: "Emails sent successfully!" });
  } catch (err) {
    console.error("Error sending emails:", err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

module.exports = router;
