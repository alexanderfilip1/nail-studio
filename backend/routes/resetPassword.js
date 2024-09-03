const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../config/db");

router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const [user] = await db.query(
      "SELECT * FROM users WHERE reset_token = ? AND reset_token_expires > ?",
      [token, Date.now()]
    );

    if (user.length > 0) {
      const hashedPassword = bcrypt.hashSync(newPassword, 8);

      await db.query(
        "UPDATE users SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE reset_token = ?",
        [hashedPassword, token]
      );

      res
        .status(200)
        .json({ status: "success", message: "Password updated successfully!" });
    } else {
      res
        .status(400)
        .json({ status: "error", message: "Invalid or expired token" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

module.exports = router;
