const teamModel = require("../models/TeamModel");
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
const { deleteFileFromS3 } = require("../utils/s3");
const ApiError = require("../utils/ApiError");

// // AWS SDK Configurationconst
// Ensure the uploads directory exists

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

//         await s3Client.send(new DeleteObjectCommand(deleteParams));
//         fs.unlinkSync(`./uploads/${imageKey}`);
//     } catch (error) {
//         console.error(error);
//     }
// };

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
//         const newFilename = `process/${uniqueSuffix}${extension}`;
//         cb(null, newFilename); // S3 key (path within the bucket)
//     },
// });

module.exports.getAllTeam = factoryController.getAllDocs(teamModel);

module.exports.getSingleTeam = factoryController.getDoc(teamModel);

module.exports.createTeam = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new ApiError("Please provide a profile image", 400));
  }

  const profile = {
    s3Url: req.file.location,
    s3Key: req.file.key,
  };

  const newTeam = await teamModel.create({
    ...req.body,
    profile,
  });

  res.status(201).json({
    status: "success",
    data: newTeam,
  });
});

module.exports.updateTeam = catchAsync(async (req, res, next) => {
  const existingMember = await teamModel.findById(req.params.id);
  if (!existingMember) {
    return next(new ApiError("Team member not found", 404));
  }

  let profile = existingMember.profile;

  if (req.file) {
    // Delete old profile from S3
    if (existingMember.profile.s3Key) {
      await deleteFileFromS3(existingMember.profile.s3Key);
    }

    // Update with new profile
    profile = {
      s3Url: req.file.location,
      s3Key: req.file.key,
    };
  }

  const updatedMember = await teamModel.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      profile,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: "success",
    data: updatedMember,
  });
});

module.exports.deleteTeam = catchAsync(async (req, res, next) => {
  const member = await teamModel.findById(req.params.id);
  if (!member) {
    return next(new ApiError("Team member not found", 404));
  }

  // Delete profile from S3
  if (member.profile.s3Key) {
    await deleteFileFromS3(member.profile.s3Key);
  }

  await teamModel.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
