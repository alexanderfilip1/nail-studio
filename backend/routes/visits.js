var express = require("express");
var router = express.Router();
const db = require("../config/db");
const secureAdmin = require("../middlewares/secureAdmin");

router.post("/", async (req, res) => {
  const ip = req.ip;

  const result = await db.query(
    `SELECT COUNT(*) FROM visits WHERE ip_address = $1 AND visited_at > NOW() - INTERVAL '24 hours'`,
    [ip]
  );

  if (result.rows[0].count === "0") {
    await db.query(`INSERT INTO visits (ip_address) VALUES ($1)`, [ip]);
  }

  res.status(200).send({ status: "success" });
});

router.get("/", secureAdmin, async (req, res) => {
  const stats = {};

  stats.last24h = await db.query(
    `SELECT COUNT(DISTINCT ip_address) FROM visits WHERE visited_at > NOW() - INTERVAL '24 hours'`
  );

  stats.last7d = await db.query(
    `SELECT COUNT(DISTINCT ip_address) FROM visits WHERE visited_at > NOW() - INTERVAL '7 days'`
  );

  stats.last30d = await db.query(
    `SELECT COUNT(DISTINCT ip_address) FROM visits WHERE visited_at > NOW() - INTERVAL '30 days'`
  );

  res.status(200).send({
    last24h: stats.last24h.rows[0].count,
    last7d: stats.last7d.rows[0].count,
    last30d: stats.last30d.rows[0].count,
  });
});

module.exports = router;
