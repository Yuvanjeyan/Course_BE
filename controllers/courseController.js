const Course = require("../models/Course");

const getUploadedMaterialUrl = (file) => {
  if (!file) return "";
  if (file.path && file.path.startsWith("http")) return file.path;
  if (file.url) return file.url;
  if (file.secure_url) return file.secure_url;

  const normalizedPath = file.path.replace(/\\/g, "/");
  const uploadsIndex = normalizedPath.indexOf("uploads/");

  if (uploadsIndex !== -1) {
    return `/${normalizedPath.slice(uploadsIndex)}`;
  }

  return normalizedPath;
};

const createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;
    const material = req.file ? getUploadedMaterialUrl(req.file) : "";

    const course = await Course.create({
      title,
      description,
      instructor: req.user.id,
      material,
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("instructor", "name email");

    res.json(courses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "instructor",
      "name email"
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user.id }).populate(
      "instructor",
      "name email"
    );

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEnrolledCourses = async (req, res) => {
  try {
    const courses = await Course.find({ students: req.user.id }).populate(
      "instructor",
      "name email"
    );

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { title, description } = req.body;
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (
      course.instructor.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Not authorized to update this course",
      });
    }

    course.title = title || course.title;
    course.description = description || course.description;
    course.material = req.file ? getUploadedMaterialUrl(req.file) : course.material;

    await course.save();

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (
      course.instructor.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Not authorized to delete this course",
      });
    }

    await Course.findByIdAndDelete(req.params.id);

    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const enrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (!course.students.includes(req.user.id)) {
      course.students.push(req.user.id);
      await course.save();
    }

    res.json({ message: "Enrolled Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  getMyCourses,
  getEnrolledCourses,
  updateCourse,
  deleteCourse,
  enrollCourse,
};
