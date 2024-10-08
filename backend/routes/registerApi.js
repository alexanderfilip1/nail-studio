var express = require("express");
var router = express.Router();
const db = require("../config/db");
const validate = require("../middlewares/validate");
const registerSchema = require("../schemas/registerSchema");
const bcrypt = require("bcryptjs");

router.post("/", validate(registerSchema), async function (req, res, next) {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );
    res
      .status(201)
      .json({ status: "success", message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    if (err.code === "ER_DUP_ENTRY") {
      res.status(400).json({ status: "error", message: "User already exists" });
    } else {
      res.status(500).json({ status: "error", message: "Server error" });
    }
  }
});
module.exports = router;
