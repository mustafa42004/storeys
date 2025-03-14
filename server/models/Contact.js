const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const validator = require("validator");

const contactSchema = new mongoose.Schema(
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
    message: {
      type: String,
      default: "",
      required: [true, "Message is required"],
      trim: true,
    },
  },
  { collection: "contact", timestamps: true }
);

// using paginate plugin
contactSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("contact", contactSchema);
