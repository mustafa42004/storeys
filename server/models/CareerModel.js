const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const validator = require("validator");

const careerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      default: "",
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      default: "",
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      default: "",
      validate: [validator.isEmail, "Please provide a valid email"],
      required: [true, "Email is required"],
      trim: true,
    },
    phone: {
      type: String,
      default: "",
      validate: [
        validator.isMobilePhone,
        "Please provide a valid phone number",
      ],
      required: [true, "Phone number is required"],
      trim: true,
    },
    designation: {
      type: String,
      default: "",
      required: [true, "Designation is required"],
      trim: true,
    },
    resume: {
      s3Url: { type: String, default: "" },
      s3Key: { type: String, default: "" },
    },
  },
  { collection: "career", timestamps: true }
);

// using paginate plugin
careerSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("career", careerSchema);
