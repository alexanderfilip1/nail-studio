var express = require("express");
var router = express.Router();
const db = require("../config/db");
const secureAdmin = require("../middlewares/secureAdmin");

router.get("/", async (req, res) => {
  try {
    const [prices] = await db.query("SELECT * FROM prices");
    res.status(200).json(prices);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  const { price, name, category_id, required_time } = req.body;

  try {
    await db.query(
      "INSERT INTO prices (price, name, category_id, required_time) VALUES (?, ?, ?, ?)",
      [price, name, category_id, required_time]
    );

    res.status(201).json({ status: "success", message: "Price created" });
  } catch (err) {
    console.error("Database error:", err);
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        status: "error",
        message: "Price with this name already exists",
      });
    }
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

router.put("/:id", secureAdmin, async (req, res) => {
  const { id } = req.params;
  const { price, name, category_id, required_time } = req.body;

  try {
    const [result] = await db.query(
      "UPDATE prices SET price = ?, name = ?, category_id = ?, required_time = ? WHERE id = ?",
      [price, name, category_id, required_time, id]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Price not found" });
    }

    res.status(200).json({ status: "success", message: "Price updated" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

router.delete("/:id", secureAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("START TRANSACTION");

    const [appointments] = await db.query(
      "SELECT id FROM appointments WHERE user_id = ?",
      [id]
    );
    const appointmentIds = appointments.map((appointment) => appointment.id);

    if (appointmentIds.length > 0) {
      await db.query(
        "DELETE FROM appointment_services WHERE appointment_id IN (?)",
        [appointmentIds]
      );

      await db.query("DELETE FROM appointments WHERE id IN (?)", [
        appointmentIds,
      ]);
    }

    const [result] = await db.query("DELETE FROM prices WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      await db.query("ROLLBACK");
      return res
        .status(404)
        .json({ status: "error", message: "Price not found" });
    }

    await db.query("COMMIT");

    res.status(200).json({ status: "success", message: "Price deleted" });
  } catch (err) {
    await db.query("ROLLBACK");
    console.error("Database error:", err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

module.exports = router;
