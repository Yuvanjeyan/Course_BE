const fs = require("fs");
const multer = require("multer");

const {
  CloudinaryStorage,
} = require("multer-storage-cloudinary");

const cloudinary = require("../config/cloudinary");

const hasCloudinaryConfig =
  process.env.CLOUD_NAME &&
  process.env.CLOUD_API_KEY &&
  process.env.CLOUD_API_SECRET;

let storage;

if (hasCloudinaryConfig && cloudinary) {
  storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "learning-platform",
      resource_type: "auto",
    },
  });
} else {
  const uploadDir = "uploads";

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, uploadDir);
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
}

const upload = multer({ storage });

module.exports = upload;
