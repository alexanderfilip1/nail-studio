const db = require("../config/db");
const jwt = require("jsonwebtoken");

const secureAdmin = async (req, res, next) => {
  if (req.cookies.token) {
    try {
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
      if (decoded.id < 1) {
        return res.status(401).json({ isAdmin: false });
      }

      const [[user]] = await db.query("SELECT admin FROM users WHERE id = ?", [
        decoded.id,
      ]);

      if (!user) {
        return res
          .status(404)
          .json({ status: "error", message: "User not found" });
      }

      if (user.admin === 1) {
        next();
      } else {
        res.status(403).json({ isAdmin: false, message: "Not an admin" });
      }
    } catch (err) {
      console.error("Error in admin check middleware:", err);
      res.status(401).json({ isAdmin: false });
    }
  } else {
    res.status(401).json({ isAdmin: false });
  }
};

module.exports = secureAdmin;
