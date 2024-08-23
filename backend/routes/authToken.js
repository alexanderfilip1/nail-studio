var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  if (req.cookies.token) {
    try {
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
      res
        .status(200)
        .json({ status: "success", message: "authenticated", user: decoded });
    } catch (err) {
      res.status(401).json({ status: "error", message: "unauthenticated" });
    }
  } else {
    res.status(401).json({ status: "unauthenticated" });
  }
});

module.exports = router;
