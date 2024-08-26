var express = require("express");
var router = express.Router();
const db = require("../config/db");

router.post("/", async (req, res) => {
  const { userID } = req.body;
  try {
    const [cashback] = await db.query(
      "SELECT * FROM cashback_usage WHERE user_id = ?",
      [userID]
    );
    // console.log(cashback);
    const cashBackHistory = [];
    cashback.map((item) => {
      const { cashback_used, usage_date } = item;
      const data = {
        cashback: cashback_used,
        usage_date: usage_date,
      };
      cashBackHistory.push(data);
    });
    res.status(200).json({ status: "success", message: cashBackHistory });
    console.log(cashBackHistory);
  } catch (err) {
    console.log(err);
  }
  // console.log(userID);
});

module.exports = router;
