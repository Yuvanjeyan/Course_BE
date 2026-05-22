const express = require("express");

const router = express.Router();

const {
  getUsers,
  deleteUser,
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

router.get(
  "/users",
  protect,
  authorizeRoles("admin"),
  getUsers
);

router.delete(
  "/users/:id",
  protect,
  authorizeRoles("admin"),
  deleteUser
);

module.exports = router;