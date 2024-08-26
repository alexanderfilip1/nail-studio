var express = require("express");
var router = express.Router();
const db = require("../config/db");

router.post("/", async (req, res) => {
  const { email } = req.body;
  try {
    // console.log(email);
    const [user] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    console.log(user[0]);
    if (user[0]) {
      const { id, username, balance, appointments, phone } = user[0];
      const userData = {
        id: id,
        username: username,
        balance: balance,
        appointments: appointments,
        phone: phone,
      };
      res.status(200).json(userData);
    } else {
      res.status(500).json({ status: "error", message: "User not found" });
      return;
    }
  } catch (err) {
    res.status(500).json({ status: "error", message: "Internal Server Error" });
    console.log(err);
  }
});

module.exports = router;
