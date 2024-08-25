var express = require("express");
var router = express.Router();
const db = require("../config/db");
const calculateAppointmentTime = require("../middlewares/calculateAppointmentTime");

router.post("/", async function (req, res, next) {
  const { name, phone, date, time, service, userID } = req.body;
  let lastTime;
  let totalTime = 0;

  try {
    const [day, month, year] = date.split("/");
    const formattedDate = `${year}-${month}-${day}`;
    const fullDate = `${formattedDate} ${time}:00`;

    const [result] = await db.query(
      "INSERT INTO appointments (name, phone, user_id, start_datetime,  end_datetime) VALUES (?, ?, ?, ?, ?)",
      [name, phone, userID, fullDate, fullDate]
    );

    await db.query(
      "UPDATE users SET appointments = appointments + 1 WHERE id = ?",
      [userID]
    );

    const appointmentId = result.insertId;

    await Promise.all(
      service.map(async (item) => {
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

    const resultTime = calculateAppointmentTime(time, totalTime);
    const endTime = `${formattedDate} ${resultTime}`;

    await db.query("UPDATE appointments SET end_datetime = ? WHERE id = ?", [
      endTime,
      appointmentId,
    ]);

    res.status(201).json({
      status: "success",
      message: `Your booking has been successfully registered on date ${fullDate} and finish ${endTime}`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json("Error occurred");
  }
});

module.exports = router;
