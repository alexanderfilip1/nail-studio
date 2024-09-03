const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/", async (req, res) => {
  const ip = req.ip;

  try {
    const result = await db.query(
      `SELECT COUNT(*) AS count FROM visits WHERE ip_address = ? AND visited_at > NOW() - INTERVAL 1 DAY`,
      [ip]
    );

    if (result[0][0].count === 0) {
      await db.query(`INSERT INTO visits (ip_address) VALUES (?)`, [ip]);
    }

    res.status(200).send({ status: "success" });
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).send({ status: "error", message: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  const stats = {};

  try {
    const last24h = await db.query(
      `SELECT COUNT(DISTINCT ip_address) AS count FROM visits WHERE visited_at > NOW() - INTERVAL 1 DAY`
    );
    stats.last24h = last24h[0][0].count;

    const last7d = await db.query(
      `SELECT COUNT(DISTINCT ip_address) AS count FROM visits WHERE visited_at > NOW() - INTERVAL 7 DAY`
    );
    stats.last7d = last7d[0][0].count;

    const last30d = await db.query(
      `SELECT COUNT(DISTINCT ip_address) AS count FROM visits WHERE visited_at > NOW() - INTERVAL 30 DAY`
    );

    stats.last30d = last30d[0][0].count;

    res.status(200).send(stats);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).send({ status: "error", message: "Internal Server Error" });
  }
});

module.exports = router;
