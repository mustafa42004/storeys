const careerModel = require("../models/CareerModel");
const factoryController = require("./factoryController");
const catchAsync = require("../utils/catchAsync");
const { deleteFileFromS3 } = require("../utils/s3");
const ApiError = require("../utils/ApiError");

module.exports.getAllCareers = factoryController.getAllDocs(careerModel);

module.exports.getSingleCareer = factoryController.getDoc(careerModel);

module.exports.createCareer = catchAsync(async (req, res, next) => {
  console.log(req.file);
  if (!req.file) {
    return next(new ApiError("Please provide a resume", 400));
  }

  const resume = {
    s3Url: req.file.location,
    s3Key: req.file.key,
  };

  const newCareer = await careerModel.create({
    ...req.body,
    resume,
  });

  res.status(201).json({
    status: "success",
    data: newCareer,
  });
});

module.exports.updateCareer = catchAsync(async (req, res, next) => {
  const existingMember = await careerModel.findById(req.params.id);
  if (!existingMember) {
    return next(new ApiError("Career not found", 404));
  }

  let profile = existingMember.profile;

  if (req.file) {
    // Delete old profile from S3
    if (existingMember.resume.s3Key) {
      await deleteFileFromS3(existingMember.resume.s3Key);
    }

    // Update with new profile
    resume = {
      s3Url: req.file.location,
      s3Key: req.file.key,
    };
  }

  const updatedMember = await careerModel.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      resume,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: "success",
    data: updatedMember,
  });
});

module.exports.deleteCareer = catchAsync(async (req, res, next) => {
  const member = await careerModel.findById(req.params.id);
  if (!member) {
    return next(new ApiError("Career not found", 404));
  }

  // Delete profile from S3
  if (member.resume.s3Key) {
    await deleteFileFromS3(member.resume.s3Key);
  }

  await careerModel.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
