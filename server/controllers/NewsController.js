const newsModel = require("../models/NewsSchema");
const factoryController = require("./factoryController");
const catchAsync = require("../utils/catchAsync");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const multerS3 = require("multer-s3");
const multer = require("multer");
const fs = require("fs");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

// // AWS SDK Configuration
// const s3Client = new S3Client({
//     region: 'us-east-2',
//     credentials: {
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     },
// });

// const deleteFromS3 = async (imageKey) => {
//     try {
//         if (!imageKey) {
//             console.error("Image key is missing");
//             return;
//         }

//         const deleteParams = {
//             Bucket: process.env.AWS_BUCKET_NAME,
//             Key: imageKey,
//         };

//         // console.log(`Attempting to delete image: ${imageKey}`);
//         const command = new DeleteObjectCommand(deleteParams);
//         const result = await s3Client.send(command);

//         console.log(`Image ${imageKey} successfully deleted from S3`, result);
//     } catch (error) {
//         console.error(`Error deleting image ${imageKey} from S3:`, error);
//         throw new Error(`Failed to delete image ${imageKey} from S3`);
//     }
// };

// // Multer S3 storage configuration
// const storage = multerS3({
//     s3: s3Client,
//     bucket: process.env.AWS_BUCKET_NAME,
//     // acl: 'public-read',
//     metadata: (req, file, cb) => {
//         cb(null, { fieldName: file.fieldname });
//     },
//     key: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//         const extension = path.extname(file.originalname);
//         const newFilename = `slider/${uniqueSuffix}${extension}`;
//         cb(null, newFilename); // S3 key (path within the bucket)
//     },
// });

// // Multer instance with limits and file type filter
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 10 * 1024 * 1024 * 1024 },
//     fileFilter: (req, file, cb) => {
//         cb(null, true);
//     },
// });

module.exports.getAllNews = factoryController.getAllDocs(newsModel);

module.exports.getSingleNews = factoryController.getDoc(newsModel);

module.exports.createNews = catchAsync(async (req, res, next) => {
  const banner = req.files["banner"]
    ? {
        s3Url: `/uploads/${req.files["banner"][0].filename}`,
        s3Key: req.files["banner"][0].filename,
      }
    : {};

  console.log(req.files);

  const newCommunity = new newsModel({ ...req.body, banner });
  await newCommunity.save();
  res.status(200).send({ success: true, result: newCommunity });
});

module.exports.updateNews = catchAsync(async (req, res, next) => {
  const community = await newsModel.findById(req.params.id);

  if (!community) {
    return res
      .status(404)
      .send({ success: false, message: "Community not found" });
  }

  if (req.files["banner"]) {
    if (fs.existsSync(`${__dirname}/../uploads/${community.banner.s3Key}`)) {
      fs.unlinkSync(`${__dirname}/../uploads/${community.banner.s3Key}`);
    }
    const banner = req.files["banner"]
      ? {
          s3Url: `/uploads/${req.files["banner"][0].filename}`,
          s3Key: req.files["banner"][0].filename,
        }
      : {};

    const updatedCommunity = await newsModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body, banner },
      { new: true }
    );
    res.status(200).send({ success: true, result: updatedCommunity });
  } else {
    const updatedCommunity = await newsModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send({ success: true, result: updatedCommunity });
  }
});

module.exports.deleteNews = catchAsync(async (req, res, next) => {
  const community = await newsModel.findById(req.params.id);
  if (fs.existsSync(`${__dirname}/../uploads/${community.banner.s3Key}`)) {
    fs.unlinkSync(`${__dirname}/../uploads/${community.banner.s3Key}`);
  }
  const deletedCommunity = await newsModel.findByIdAndDelete(req.params.id);
  res.status(200).send({ success: true, result: deletedCommunity });
});
