const propertyModel = require("../models/PropertySchema");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const fs = require("fs");
const factoryController = require("./factoryController");

// const multerS3 = require("multer-s3");
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
//         const newFilename = `process/${uniqueSuffix}${extension}`;
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

module.exports.getAllProperties = factoryController.getAllDocs(propertyModel);

module.exports.getSingleProperty = factoryController.getDoc(propertyModel);

module.exports.createProperty = catchAsync(async (req, res, next) => {
  const banner = req.files["banner"]
    ? {
        s3Url: `/uploads/${req.files["banner"][0].filename}`,
        s3Key: req.files["banner"][0].filename,
      }
    : {};

  const images = req.files["image"]
    ? req.files["image"].map((file) => ({
        s3Url: `/uploads/${file.filename}`,
        s3Key: file.filename,
      }))
    : [];

  /// Parse JSON stringified fields
  const amenities = req.body.amenities ? JSON.parse(req.body.amenities) : [];
  const propertyInfo = req.body.propertyInfo
    ? JSON.parse(req.body.propertyInfo)
    : {};
  const buildingInfo = req.body.buildingInfo
    ? JSON.parse(req.body.buildingInfo)
    : {};
  const description = req.body.description
    ? JSON.parse(req.body.description)
    : [];

  // Ensure other fields are correctly handled
  const propertyData = {
    ...req.body,
    banner,
    image: images,
    amenities,
    propertyInfo,
    buildingInfo,
    description,
  };

  const data = await propertyModel.create(propertyData);
  res.status(200).json({ success: true, result: data });
});

module.exports.updateProperty = catchAsync(async (req, res, next) => {
  // Parse JSON stringified fields
  const amenities = req.body.amenities ? JSON.parse(req.body.amenities) : [];
  const propertyInfo = req.body.propertyInfo
    ? JSON.parse(req.body.propertyInfo)
    : {};
  const buildingInfo = req.body.buildingInfo
    ? JSON.parse(req.body.buildingInfo)
    : {};
  const description = req.body.description
    ? JSON.parse(req.body.description)
    : [];
  let newBanner = null;

  // Prepare new banner and images
  if (req.files["banner"]) {
    await deleteFromS3(req.body.banner.s3Key);
    newBanner = req.files["banner"]
      ? {
          s3Url: `/uploads/${req.files["banner"][0].filename}`,
          s3Key: req.files["banner"][0].filename,
        }
      : null;
  }

  const newImages = req.files["image"]
    ? req.files["image"].map((file) => ({
        s3Url: `/uploads/${file.filename}`,
        s3Key: file.filename,
      }))
    : [];

  const removedImages = req.body.removedImages
    ? JSON.parse(req.body.removedImages)
    : [];

  // Retrieve existing images from the database
  const existingProperty = await propertyModel.findById(req.params.id);
  const existingImages = existingProperty.image || [];

  // Filter out removed images from existing images
  const filteredImages = existingImages.filter(
    (img) => !removedImages.includes(img.s3Key)
  );

  // Directly modify the property object
  const propertyData = {
    ...req.body,
    banner: newBanner || req.body.banner,
    image: [...filteredImages, ...newImages],
    amenities,
    propertyInfo,
    buildingInfo,
    description,
  };

  // Remove images from the filesystem
  for (const image of removedImages) {
    fs.unlinkSync(image);
  }

  // Update the database
  const updatedProperty = await propertyModel.findByIdAndUpdate(
    req.params.id,
    propertyData,
    { new: true }
  );
  res.status(200).send({ success: true, result: updatedProperty });
});

module.exports.deleteProperty = catchAsync(async (req, res, next) => {
  const property = await propertyModel.findOne({ _id: req.params.id });
  if (!property) {
    next(new ApiError("Property not found", 404));
  }

  // Delete banner from S3
  if (property.banner.s3Key) {
    // await deleteFromS3(property.banner.s3Key);
    fs.unlinkSync(property.banner.s3Url);
  }

  // Delete images from S3
  property.image.forEach((img) => {
    if (img.s3Key) {
      // deleteFromS3(img.s3Key);
      fs.unlinkSync(img.s3Url);
    }
  });

  // await property?.remove();
  await propertyModel.findByIdAndDelete(req.params.id);
  res
    .status(200)
    .json({ success: true, message: "Property deleted successfully" });
});
