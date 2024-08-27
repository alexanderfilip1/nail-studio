var express = require("express");
var router = express.Router();
const db = require("../config/db");

router.get("/", async (req, res) => {
  const { date } = req.query;

  const [day, month, year] = date.split("/");
  const parsedDate = new Date(`${year}-${month}-${day}T00:00:00`);
  const startDate = new Date(parsedDate);
  const endDate = new Date(parsedDate);
  endDate.setDate(endDate.getDate() + 1);

  const query = `
        SELECT start_datetime, end_datetime
        FROM appointments
        WHERE start_datetime >= ? AND start_datetime < ?
    `;
  const [results] = await db.query(query, [startDate, endDate]);

  const unavailableSlots = results.map((appointment) => ({
    start: appointment.start_datetime,
    end: appointment.end_datetime,
  }));

  res.json(unavailableSlots);
});

module.exports = router;
