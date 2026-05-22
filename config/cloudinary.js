const cloudinary = require("cloudinary").v2;

const isCloudinaryConfigured =
  process.env.CLOUD_NAME &&
  process.env.CLOUD_API_KEY &&
  process.env.CLOUD_API_SECRET;

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });
} else {
  console.warn(
    "Cloudinary is not configured. File uploads will use local storage."
  );
}

module.exports = isCloudinaryConfigured ? cloudinary : null;
