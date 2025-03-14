const Testimonial = require("../models/TestimonialModel");
const factory = require("./factoryController");
const catchAsync = require("../utils/catchAsync");
const { deleteFileFromS3 } = require("../utils/s3");
const ApiError = require("../utils/ApiError");

exports.getAllTestimonials = factory.getAllDocs(Testimonial);

exports.getTestimonial = factory.getDoc(Testimonial);

exports.createTestimonial = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new ApiError("Please provide an image", 400));
  }

  const image = {
    s3Url: req.file.location, // S3 URL from multer-s3
    s3Key: req.file.key, // S3 key from multer-s3
  };

  const testimonial = await Testimonial.create({
    ...req.body,
    image,
  });

  res.status(201).json({
    status: "success",
    data: testimonial,
  });
});

exports.updateTestimonial = catchAsync(async (req, res, next) => {
  const existingTestimonial = await Testimonial.findById(req.params.id);
  if (!existingTestimonial) {
    return next(new ApiError("Testimonial not found", 404));
  }

  let image = existingTestimonial.image;

  if (req.file) {
    // Delete old image from S3
    if (existingTestimonial.image.s3Key) {
      await deleteFileFromS3(existingTestimonial.image.s3Key);
    }

    // Update with new image
    image = {
      s3Url: req.file.location,
      s3Key: req.file.key,
    };
  }

  const updatedTestimonial = await Testimonial.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      image,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: "success",
    data: updatedTestimonial,
  });
});

exports.deleteTestimonial = catchAsync(async (req, res, next) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) {
    return next(new ApiError("Testimonial not found", 404));
  }

  // Delete image from S3
  if (testimonial.image.s3Key) {
    await deleteFileFromS3(testimonial.image.s3Key);
  }

  await Testimonial.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
