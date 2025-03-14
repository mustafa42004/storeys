const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    location: { type: String, required: [true, "Location is required"] },
    message: { type: String, required: [true, "Message is required"] },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be between 1 and 5"],
      max: [5, "Rating must be between 1 and 5"],
    },
    image: {
      s3Url: {
        type: String,
        default: "",
        required: [true, "Image s3Url is required"],
      },
      s3Key: {
        type: String,
        default: "",
        required: [true, "Image s3Key is required"],
      },
    },
  },
  { timestamps: true }
);

testimonialSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Testimonial", testimonialSchema);
