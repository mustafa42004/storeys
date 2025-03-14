const newsModel = require("../models/NewsModel");
const factoryController = require("./factoryController");
const catchAsync = require("../utils/catchAsync");
const { deleteFileFromS3 } = require("../utils/s3");
const ApiError = require("../utils/ApiError");

module.exports.getAllNews = factoryController.getAllDocs(newsModel);

module.exports.getSingleNews = factoryController.getDoc(newsModel);

module.exports.createNews = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new ApiError("Please provide a banner image", 400));
  }

  const banner = {
    s3Url: req.file.location,
    s3Key: req.file.key,
  };

  const newNews = await newsModel.create({
    ...req.body,
    banner,
  });

  res.status(201).json({
    status: "success",
    data: newNews,
  });
});

module.exports.updateNews = catchAsync(async (req, res, next) => {
  const news = await newsModel.findById(req.params.id);

  if (!news) {
    return next(new ApiError("News not found", 404));
  }

  let banner = news.banner;

  if (req.file) {
    // Delete old banner from S3
    if (news.banner.s3Key) {
      await deleteFileFromS3(news.banner.s3Key);
    }

    // Update with new banner
    banner = {
      s3Url: req.file.location,
      s3Key: req.file.key,
    };
  }

  const updatedNews = await newsModel.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      banner,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: "success",
    data: updatedNews,
  });
});

module.exports.deleteNews = catchAsync(async (req, res, next) => {
  const news = await newsModel.findById(req.params.id);

  if (!news) {
    return next(new ApiError("News not found", 404));
  }

  // Delete banner from S3
  if (news.banner.s3Key) {
    await deleteFileFromS3(news.banner.s3Key);
  }

  await newsModel.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
