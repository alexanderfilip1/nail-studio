var express = require("express");
var router = express.Router();
const db = require("../config/db");

router.post("/", async function (req, res, next) {
  const { name, phone, date, service } = req.body;
  const dateObj = new Date(date);
  const hour = dateObj.getHours();
  let lastTime;
  let totalTime = 0;
  try {
    console.log(date[0]);
    const [result] = await db.query(
      "INSERT INTO appointments (name, phone, start_datetime, end_datetime) VALUES (?, ?, ?, ?)",
      [name, phone, date, date]
    );
    const appointmentId = result.insertId;

    await Promise.all(
      service.map(async (item) => {
        console.log(item);

        const [id] = await db.query("SELECT id FROM prices WHERE name = ?", [
          item,
        ]);

        const [time] = await db.query(
          "SELECT required_time FROM prices WHERE name = ?",
          [item]
        );

        lastTime = time[0].required_time;
        totalTime += +lastTime;
        const serviceId = id[0].id;
        await db.query(
          "INSERT INTO appointment_services (appointment_id, service_id) VALUES (?, ?)",
          [appointmentId, serviceId]
        );
      })
    );

    const timeInHours = totalTime / 60;
    console.log(timeInHours + hour);

    console.log(`Total Time for All Services: ${totalTime}`);

    res.status(201).json("Success");
  } catch (err) {
    console.log(err);
    res.status(500).json("Error occurred");
  }
});

module.exports = router;
