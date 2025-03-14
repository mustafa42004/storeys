const teamModel = require("../models/TeamSchema");
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
  console.log(req.files);
  const profile = req.files["profile"]
    ? {
        s3Url: `/uploads/${req.files["profile"][0].filename}`,
        s3Key: req.files["profile"][0].filename,
      }
    : {};

  const newTeam = await teamModel.create({ ...req.body, profile });
  res.status(200).send({ success: true, result: newTeam });
});

module.exports.updateTeam = catchAsync(async (req, res, next) => {
  const file = req.files["profile"];
  const { firstName, lastName, designation } = req.body;
  const { id } = req.params;

  // Find the existing member
  const existingMember = await teamModel.findOne({ _id: id });

  let profile = existingMember.profile;

  if (file) {
    // If a new profile image is provided
    profile = {
      s3Url: `/uploads/${req.files["profile"][0].filename}`,
      s3Key: req.files["profile"][0].filename,
    };

    // Delete the old profile image if it exists
    if (existingMember.profile.s3Url) {
      fs.unlinkSync(`${__dirname}/../uploads/${existingMember.profile.s3Key}`);
    }
  }

  // Update the member's data
  const updatedMember = await teamModel.findByIdAndUpdate(
    req.params.id,
    {
      firstName,
      lastName,
      designation,
      profile,
    },
    { new: true }
  );

  res.status(200).send({ success: true, result: updatedMember });
});

module.exports.deleteTeam = catchAsync(async (req, res, next) => {
  const team = await teamModel.findById(req.params.id);
  if (!team) {
    return res
      .status(404)
      .send({ success: false, message: "Member not found" });
  }
  if (fs.existsSync(`${__dirname}/../uploads/${team.profile.s3Key}`)) {
    fs.unlinkSync(`${__dirname}/../uploads/${team.profile.s3Key}`);
  }
  // await deleteFromS3(team.profile.s3Key)
  const deletedTeam = await teamModel.findByIdAndDelete(req.params.id);
  res.status(200).send({ success: true, result: deletedTeam });
});
