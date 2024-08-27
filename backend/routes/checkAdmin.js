var express = require("express");
var router = express.Router();
const db = require("../config/db");
const validate = require("../middlewares/validate");
const checkAdminSchema = require("../schemas/idSchema");

router.post("/", validate(checkAdminSchema), async function (req, res, next) {
  const { userID } = req.body;

  if (!userID || isNaN(userID)) {
    return res.status(400).json({ status: "error", message: "Invalid userID" });
  }

  try {
    const [[isAdmin]] = await db.query("SELECT admin FROM users WHERE id = ?", [
      userID,
    ]);

    if (!isAdmin) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    const { admin } = isAdmin;
    if (admin) {
      return res.status(200).json({ isAdmin: true });
    } else {
      return res.status(403).json({ isAdmin: false, message: "Not an admin" });
    }
  } catch (err) {
    console.error("Database error:", err);
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server Error" });
  }
});

module.exports = router;
