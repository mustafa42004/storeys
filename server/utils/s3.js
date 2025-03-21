const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
const ApiError = require("./ApiError");

if (!process.env.AWS_BUCKET_NAME) {
  throw new Error("AWS_BUCKET_NAME is required in environment variables");
}

// AWS S3 Client configuration
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Delete file from S3
const deleteFileFromS3 = async (key) => {
  try {
    if (!key) {
      console.error("No key provided for S3 deletion");
      return;
    }

    const deleteParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    };

    await s3Client.send(new DeleteObjectCommand(deleteParams));
    console.log(`Successfully deleted file from S3: ${key}`);
  } catch (error) {
    console.error(`Error deleting file from S3: ${key}`, error);
    throw new Error("Failed to delete file from S3");
  }
};

// Configure multer-s3 upload
const s3Upload = (folder) => {
  return multer({
    storage: multerS3({
      s3: s3Client,
      bucket: process.env.AWS_BUCKET_NAME,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      key: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = path.extname(file.originalname);
        cb(null, `${folder}/${uniqueSuffix}${ext}`);
      },
    }),
    limits: {
      fileSize: 50 * 1024 * 1024, // 50MB limit
    },
    fileFilter: (req, file, cb) => {
      // Handle SVG files specially
      if (file.mimetype === "image/svg+xml") {
        return cb(null, true);
      }

      const allowedTypes = /jpeg|jpg|png|gif|svg|pdf|doc|docx|ppt/;
      const ext = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      const mimetype = allowedTypes.test(file.mimetype);

      if (ext && mimetype) {
        return cb(null, true);
      }
      cb(
        new ApiError(
          "Only images (JPEG, JPG, PNG, GIF, SVG)  and PDFs are allowed",
          400
        )
      );
    },
  });
};

module.exports = {
  s3Client,
  deleteFileFromS3,
  s3Upload,
};
