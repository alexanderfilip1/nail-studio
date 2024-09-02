var express = require("express");
var router = express.Router();
const db = require("../config/db");
const validate = require("../middlewares/validate");
const loginSchema = require("../schemas/loginSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", validate(loginSchema), async function (req, res, next) {
  const { email, password } = req.body;
  try {
    const [data] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    const isValid = bcrypt.compareSync(password, data[0].password);

    if (data[0] && isValid) {
      console.log(data[0]);
      const token = jwt.sign(
        { id: data[0].id, email: email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600000,
      });

      res.status(200).json({ status: "success", message: "Logged in!" });
    } else {
      res.status(404).json({ status: "error", message: "User not found" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
