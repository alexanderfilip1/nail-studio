var express = require("express");
var router = express.Router();
const db = require("../config/db");

router.post("/", async function (req, res, next) {
  const { name, phone, date, service } = req.body;
  console.log(service);
  try {
    const [result] = await db.query(
      "INSERT INTO appointments (name, phone, start_datetime, end_datetime) VALUES (?, ?, ?, ?)",
      [name, phone, date, date]
    );
    const appointmentId = result.insertId;
    service.forEach(async (item) => {
      console.log(item);
      const [id] = await db.query("SELECT id FROM prices WHERE name = ?", [
        item,
      ]);
      const serviceId = id[0].id;
      await db.query(
        "INSERT INTO appointment_services (appointment_id, service_id) VALUES (?, ?)",
        [appointmentId, serviceId]
      );
    });
    res.status(201).json("Success");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
