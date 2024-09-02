var express = require("express");
var router = express.Router();
const db = require("../config/db");
const validate = require("../middlewares/validate");
const checkAdminSchema = require("../schemas/idSchema");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  console.log(req.cookies.token);
  if (req.cookies.token) {
    try {
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
      if (decoded.id < 1) {
        return;
      }
      const [[isAdmin]] = await db.query(
        "SELECT admin FROM users WHERE id = ?",
        [decoded.id]
      );
      if (isAdmin.admin === 1) {
        console.log("He's admin!");
        res.status(200).json({ isAdmin: true });
      }
    } catch (err) {
      res.status(401).json({ isAdmin: false });
    }
  } else {
    res.status(401).json({ isAdmin: false });
  }
});

module.exports = router;
