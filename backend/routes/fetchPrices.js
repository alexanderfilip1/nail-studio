var express = require("express");
var router = express.Router();
const db = require("../config/db");

router.get("/", async function (req, res, next) {
  const data = await db.query("SELECT * FROM prices");
  res.json(data[0]);
});

module.exports = router;
