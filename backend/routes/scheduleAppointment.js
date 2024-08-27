var express = require("express");
var router = express.Router();
const db = require("../config/db");
const calculateAppointmentTime = require("../middlewares/calculateAppointmentTime");

router.post("/", async function (req, res, next) {
  const { name, phone, date, time, service, userID, cashback } = req.body;
  let lastTime;
  let totalTime = 0;

  try {
    const [month, day, year] = date.split("/");

    const formattedDate = `${year}-${month}-${day}`;

    const fullDate = `${formattedDate} ${time}:00`;

    const [[user]] = await db.query("SELECT * FROM users WHERE id = ?", [
      userID,
    ]);
    console.log(user);
    const servicePrices = await Promise.all(
      service.map(async (item) => {
        const [priceData] = await db.query(
          "SELECT price, required_time FROM prices WHERE name = ?",
          [item]
        );
        if (priceData.length === 0) {
          throw new Error(`Service ${item} not found`);
        }
        lastTime = priceData[0].required_time;
        totalTime += +lastTime;
        return priceData[0].price;
      })
    );

    const totalPrice = servicePrices.reduce((acc, price) => acc + price, 0);

    const cashbackAvailable = user.balance;
    const cashbackUsed = Math.min(cashbackAvailable, totalPrice);
    const finalPrice = totalPrice - cashbackUsed;

    console.log("Full date-time value for insertion:", fullDate);

    const [result] = await db.query(
      "INSERT INTO appointments (name, phone, user_id, start_datetime, end_datetime, total_price, cashback_used) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, phone, userID, fullDate, fullDate, finalPrice, cashbackUsed]
    );

    await db.query(
      "UPDATE users SET appointments = appointments + 1, balance = balance - ? WHERE id = ?",
      [cashbackUsed, userID]
    );

    const appointmentId = result.insertId;
    await db.query(
      "INSERT INTO cashback_usage (user_id, appointment_id, cashback_used, usage_date) VALUES (?, ?, ?, ?)",
      [userID, appointmentId, cashbackUsed, new Date()]
    );

    await Promise.all(
      service.map(async (item) => {
        const [[serviceData]] = await db.query(
          "SELECT id FROM prices WHERE name = ?",
          [item]
        );
        if (!serviceData) {
          throw new Error(`Service ${item} not found`);
        }
        const serviceId = serviceData.id;
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
    if (user.phone === "0" && user.id !== "0") {
      await db.query("UPDATE users SET phone = ? WHERE id = ?", [
        phone,
        userID,
      ]);
    }
    res.status(201).json({
      status: "success",
      message: `Your booking has been successfully registered on date ${fullDate} and finishes at ${endTime}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "An error occurred while processing your request.",
    });
  }
});

module.exports = router;
