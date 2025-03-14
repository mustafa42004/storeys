const propertyModel = require("../models/PropertyModel");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const factoryController = require("./factoryController");
const { deleteFileFromS3 } = require("../utils/s3");

module.exports.getAllProperties = factoryController.getAllDocs(propertyModel);

module.exports.getSingleProperty = factoryController.getDoc(propertyModel);

module.exports.createProperty = catchAsync(async (req, res, next) => {
  // Handle banner image
  if (!req.files.banner) {
    return next(new ApiError("Please provide a banner image", 400));
  }

  const banner = {
    s3Url: req.files.banner[0].location,
    s3Key: req.files.banner[0].key,
  };

  // Handle property images
  const images = req.files.image
    ? req.files.image.map((file) => ({
        s3Url: file.location,
        s3Key: file.key,
      }))
    : [];

  // Parse JSON fields if they're strings
  const amenities =
    typeof req.body.amenities === "string"
      ? JSON.parse(req.body.amenities)
      : req.body.amenities;
  const propertyInfo =
    typeof req.body.propertyInfo === "string"
      ? JSON.parse(req.body.propertyInfo)
      : req.body.propertyInfo;
  const buildingInfo =
    typeof req.body.buildingInfo === "string"
      ? JSON.parse(req.body.buildingInfo)
      : req.body.buildingInfo;

  const property = await propertyModel.create({
    ...req.body,
    banner,
    image: images,
    amenities,
    propertyInfo,
    buildingInfo,
  });

  res.status(201).json({
    status: "success",
    data: property,
  });
});

module.exports.updateProperty = catchAsync(async (req, res, next) => {
  const property = await propertyModel.findById(req.params.id);
  if (!property) {
    return next(new ApiError("Property not found", 404));
  }

  let banner = property.banner;
  let images = property.image;

  // Handle banner update
  if (req.files.banner) {
    // Delete old banner
    if (property.banner.s3Key) {
      await deleteFileFromS3(property.banner.s3Key);
    }
    banner = {
      s3Url: req.files.banner[0].location,
      s3Key: req.files.banner[0].key,
    };
  }

  // Handle removed images
  const removedImages = req.body.removedImages
    ? JSON.parse(req.body.removedImages)
    : [];

  for (const imageKey of removedImages) {
    await deleteFileFromS3(imageKey);
    images = images.filter((img) => img.s3Key !== imageKey);
  }

  // Add new images
  if (req.files.image) {
    const newImages = req.files.image.map((file) => ({
      s3Url: file.location,
      s3Key: file.key,
    }));
    images = [...images, ...newImages];
  }

  // Parse JSON fields if they're strings
  const amenities =
    typeof req.body.amenities === "string"
      ? JSON.parse(req.body.amenities)
      : req.body.amenities;
  const propertyInfo =
    typeof req.body.propertyInfo === "string"
      ? JSON.parse(req.body.propertyInfo)
      : req.body.propertyInfo;
  const buildingInfo =
    typeof req.body.buildingInfo === "string"
      ? JSON.parse(req.body.buildingInfo)
      : req.body.buildingInfo;

  const updatedProperty = await propertyModel.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      banner,
      image: images,
      amenities,
      propertyInfo,
      buildingInfo,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: "success",
    data: updatedProperty,
  });
});

module.exports.deleteProperty = catchAsync(async (req, res, next) => {
  const property = await propertyModel.findById(req.params.id);
  if (!property) {
    return next(new ApiError("Property not found", 404));
  }

  // Delete banner from S3
  if (property.banner.s3Key) {
    await deleteFileFromS3(property.banner.s3Key);
  }

  // Delete all property images from S3
  for (const image of property.image) {
    if (image.s3Key) {
      await deleteFileFromS3(image.s3Key);
    }
  }

  await propertyModel.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
