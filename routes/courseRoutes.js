const express = require("express");

const router = express.Router();

const {
  createCourse,
  getCourses,
  getCourseById,
  getMyCourses,
  getEnrolledCourses,
  updateCourse,
  deleteCourse,
  enrollCourse,
} = require("../controllers/courseController");

const { protect } = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

const upload = require("../middleware/cloudUpload");

router.post(
  "/",
  protect,
  authorizeRoles("teacher", "admin"),
  upload.single("material"),
  createCourse
);

router.get("/", protect, getCourses);

router.get("/my", protect, authorizeRoles("teacher", "admin"), getMyCourses);

router.get(
  "/enrolled",
  protect,
  authorizeRoles("student"),
  getEnrolledCourses
);

router.get("/:id", protect, getCourseById);

router.put(
  "/:id",
  protect,
  authorizeRoles("teacher", "admin"),
  upload.single("material"),
  updateCourse
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("teacher", "admin"),
  deleteCourse
);

router.post(
  "/enroll/:id",
  protect,
  authorizeRoles("student"),
  enrollCourse
);

module.exports = router;