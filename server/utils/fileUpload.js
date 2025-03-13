const multer = require("multer");
const path = require("path");

const uploadDir = path.join(__dirname, "../uploads");

// Configure multer for local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    const newFilename = `process-${uniqueSuffix}${extension}`;
    cb(null, newFilename);
  },
});

const upload = multer({ storage });

module.exports = upload;
