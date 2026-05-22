const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

router.get(
  "/admin",
  protect,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({
      message: "Welcome Admin",
    });
  }
);

router.get(
  "/teacher",
  protect,
  authorizeRoles("teacher", "admin"),
  (req, res) => {
    res.json({
      message: "Welcome Teacher",
    });
  }
);

router.get(
  "/student",
  protect,
  authorizeRoles("student"),
  (req, res) => {
    res.json({
      message: "Welcome Student",
    });
  }
);

module.exports = router;