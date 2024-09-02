var express = require("express");
var router = express.Router();
const db = require("../config/db");
const secureAdmin = require("../middlewares/secureAdmin");

router.get("/", secureAdmin, async (req, res) => {
  try {
    const [appointments] = await db.query("SELECT * FROM appointments");
    res.status(200).json(appointments);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

router.delete("/:id", secureAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("START TRANSACTION");

    await db.query("DELETE FROM cashback_usage WHERE appointment_id = ?", [id]);

    await db.query(
      "DELETE FROM appointment_services WHERE appointment_id = ?",
      [id]
    );

    const [result] = await db.query("DELETE FROM appointments WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      await db.query("ROLLBACK");
      return res
        .status(404)
        .json({ status: "error", message: "Appointment not found" });
    }

    await db.query("COMMIT");

    res.status(200).json({ status: "success", message: "Appointment deleted" });
  } catch (err) {
    await db.query("ROLLBACK");
    console.error("Database error:", err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

module.exports = router;
