var express = require("express");
var router = express.Router();
const db = require("../config/db");

router.post("/", async (req, res) => {
  const { userID } = req.body;

  try {
    const [userAppointments] = await db.query(
      "SELECT * FROM appointments WHERE user_id = ?",
      [userID]
    );

    const detailedAppointments = [];

    for (const appointment of userAppointments) {
      const { id, name, phone, start_datetime, total_price, cashback_used } =
        appointment;

      const [appointmentServicesID] = await db.query(
        "SELECT service_id FROM appointment_services WHERE appointment_id = ?",
        [id]
      );

      const serviceNames = [];

      for (const item of appointmentServicesID) {
        try {
          const [[serviceName]] = await db.query(
            "SELECT name FROM prices WHERE id = ?",
            [item.service_id]
          );

          serviceNames.push(serviceName.name);
        } catch (error) {
          console.error(
            `Error fetching service name for service_id ${item.service_id}:`,
            error
          );
        }
      }

      detailedAppointments.push({
        id,
        name,
        phone,
        start_datetime,
        total_price,
        cashback_used,
        services: serviceNames,
      });
    }

    res.status(200).json({
      status: "success",
      appointments: detailedAppointments,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching the appointments.",
    });
  }
});

module.exports = router;
