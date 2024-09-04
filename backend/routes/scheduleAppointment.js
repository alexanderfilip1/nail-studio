var express = require("express");
var router = express.Router();
const db = require("../config/db");
const calculateAppointmentTime = require("../middlewares/calculateAppointmentTime");
const sendAppointment = require("../middlewares/sendAppointment"); // Ensure this path is correct

router.post("/", async function (req, res, next) {
  const {
    name,
    phone,
    date,
    time,
    service,
    userID,
    cashback,
    receiveCashback,
  } = req.body;
  let lastTime;
  let totalTime = 0;

  try {
    const [day, month, year] = date.split("/");
    const formattedDate = `${year}-${month}-${day}`;

    const fullDate = `${formattedDate} ${time}:00`;
    const [[user]] = await db.query("SELECT * FROM users WHERE id = ?", [
      userID,
    ]);
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
    const cashbackUsed = Math.min(cashbackAvailable, cashback, totalPrice);
    const finalPrice = totalPrice - cashbackUsed;

    const [result] = await db.query(
      "INSERT INTO appointments (name, phone, user_id, start_datetime, end_datetime, total_price, cashback_used) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, phone, userID, fullDate, fullDate, finalPrice, cashbackUsed]
    );

    const appointmentId = result.insertId;

    if (cashbackUsed > 0) {
      await db.query(
        "UPDATE users SET appointments = appointments + 1, balance = balance - ? WHERE id = ?",
        [cashbackUsed, userID]
      );
      await db.query(
        "INSERT INTO cashback_usage (user_id, appointment_id, cashback_used, operation, usage_date) VALUES (?, ?, ?, ?, ?)",
        [userID, appointmentId, cashbackUsed, "-", new Date()]
      );
    } else {
      await db.query(
        "UPDATE users SET appointments = appointments + 1 WHERE id = ?",
        [userID]
      );
    }

    if (receiveCashback > 0) {
      await db.query("UPDATE users SET balance = balance + ? WHERE id = ?", [
        receiveCashback,
        userID,
      ]);
      await db.query(
        "INSERT INTO cashback_usage (user_id, appointment_id, cashback_used, operation, usage_date) VALUES (?, ?, ?, ?, ?)",
        [userID, appointmentId, receiveCashback, "+", new Date()]
      );
    }

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

    const telegramMessage = `
  <b>📝 New Appointment Registered 📝</b>
  <b>Name:</b> ${name}
  <b>Phone:</b> <code>${phone}</code>
  <b>Date:</b> ${date}
  <b>Time:</b> ${time}
  <b>Services:</b> ${service.join(", ")}
  <b>Total Price:</b> ${totalPrice} LEI
  <b>Cashback Used:</b> ${cashbackUsed} LEI
  <b>Final Price:</b> ${finalPrice} LEI
  <b>Appointment ID:</b> ${appointmentId}
  <b>Starts:</b> ${fullDate}
  <b>Ends:</b> ${endTime}
`.trim();

    await sendAppointment(telegramMessage);

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
