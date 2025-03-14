const Testimonial = require("../models/TestimonialModel");
const factory = require("./factoryController");
const fs = require("fs");
const catchAsync = require("../utils/catchAsync");

exports.getAllTestimonials = factory.getAllDocs(Testimonial);

exports.getTestimonial = factory.getDoc(Testimonial);

exports.createTestimonial = catchAsync(async (req, res, next) => {
  const image = req.files["image"]
    ? {
        s3Url: `/uploads/${req.files["image"][0].filename}`,
        s3Key: req.files["image"][0].filename,
      }
    : {};

  console.log(req.files["image"]);

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
  const file = req.files["image"];
  const { id } = req.params;

  // Find the existing member
  const existingTestimonial = await Testimonial.findOne({ _id: id });

  let image = existingTestimonial.image;

  if (file) {
    // If a new profile image is provided
    image = {
      s3Url: `/uploads/${req.files["image"][0].filename}`,
      s3Key: req.files["image"][0].filename,
    };

    // Delete the old profile image if it exists
    if (existingTestimonial.image.s3Url) {
      fs.unlinkSync(
        `${__dirname}/../uploads/${existingTestimonial.image.s3Key}`
      );
    }
  }

  // Update the member's data
  const updatedTestimonial = await Testimonial.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      image,
    },
    { new: true }
  );

  res.status(200).send({ success: true, result: updatedTestimonial });
});

exports.deleteTestimonial = catchAsync(async (req, res, next) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    return res
      .status(404)
      .send({ success: false, message: "Testimonial not found" });
  }
  if (fs.existsSync(`${__dirname}/../uploads/${testimonial.image.s3Key}`)) {
    fs.unlinkSync(`${__dirname}/../uploads/${testimonial.image.s3Key}`);
  }
  // await deleteFromS3(team.profile.s3Key)
  const deletedTestimonial = await Testimonial.findByIdAndDelete(req.params.id);
  res.status(200).send({ success: true, result: deletedTestimonial });
});
