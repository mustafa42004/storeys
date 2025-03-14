const communityModel = require("../models/CommunitySchema");
const catchAsync = require("../utils/catchAsync");
const { deleteFileFromS3 } = require("../utils/s3");
const ApiError = require("../utils/ApiError");

exports.getAllCommunities = catchAsync(async (req, res) => {
  const data = await communityModel.find();

  res.status(200).json({
    status: "success",
    data: data,
  });
});

exports.getCommunity = catchAsync(async (req, res, next) => {
  const data = await communityModel.findById(req.params.id);

  if (!data) {
    return next(new ApiError("Community not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: data,
  });
});

exports.createCommunity = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new ApiError("Please provide a banner image", 400));
  }

  const banner = {
    s3Url: req.file.location,
    s3Key: req.file.key,
  };

  const newCommunity = await communityModel.create({
    ...req.body,
    banner,
  });

  res.status(201).json({
    status: "success",
    data: newCommunity,
  });
});

exports.updateCommunity = catchAsync(async (req, res, next) => {
  const community = await communityModel.findById(req.params.id);

  if (!community) {
    return next(new ApiError("Community not found", 404));
  }

  let banner = community.banner;

  if (req.file) {
    // Delete old banner from S3
    if (community.banner.s3Key) {
      await deleteFileFromS3(community.banner.s3Key);
    }

    // Update with new banner
    banner = {
      s3Url: req.file.location,
      s3Key: req.file.key,
    };
  }

  const updatedCommunity = await communityModel.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      banner,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: "success",
    data: updatedCommunity,
  });
});

exports.deleteCommunity = catchAsync(async (req, res, next) => {
  const community = await communityModel.findById(req.params.id);

  if (!community) {
    return next(new ApiError("Community not found", 404));
  }

  // Delete banner from S3
  if (community.banner.s3Key) {
    await deleteFileFromS3(community.banner.s3Key);
  }

  await communityModel.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
