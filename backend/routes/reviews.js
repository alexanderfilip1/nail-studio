var express = require("express");
var router = express.Router();
const db = require("../config/db");

router.get("/", async (req, res) => {
  try {
    const [reviews] = await db.query("SELECT * FROM reviews");
    res.status(200).json(reviews);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
});

router.post("/createReview", async (req, res) => {
  const { rating, name, text } = req.body;
  try {
    await db.query(
      "INSERT INTO reviews (name, review_text, stars) VALUES (?,?,?)",
      [name, text, rating]
    );
    res
      .status(201)
      .json({ status: "success", message: "Review sent successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

module.exports = router;
