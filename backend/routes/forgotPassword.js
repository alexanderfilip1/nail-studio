const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const db = require("../config/db");

function toMysqlDatetime(timestamp) {
  const date = new Date(timestamp);
  return date.toISOString().slice(0, 19).replace("T", " ");
}

const transporter = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const [user] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (user.length > 0) {
      const resetToken = crypto.randomBytes(32).toString("hex");
      const expireTime = toMysqlDatetime(Date.now() + 3600000);

      await db.query(
        "UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE email = ?",
        [resetToken, expireTime, email]
      );

      const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset",
        html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
      };

      await transporter.sendMail(mailOptions);

      res
        .status(200)
        .json({ status: "success", message: "Password reset email sent!" });
    } else {
      res.status(404).json({ status: "error", message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

module.exports = router;
