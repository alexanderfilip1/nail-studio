var express = require("express");
var router = express.Router();
const db = require("../config/db");
const adminAuth = require("../middlewares/")

router.get("/", async (req, res) => {
  try {
    const [users] = await db.query("SELECT * FROM users");
    res.status(200).json(users);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [[user]] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
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

    const result = await db.query("DELETE FROM users WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      await db.query("ROLLBACK");
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    await db.query("COMMIT");

    res.status(200).json({ status: "success", message: "User deleted" });
  } catch (err) {
    await db.query("ROLLBACK");
    console.error("Database error:", err);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

module.exports = router;
