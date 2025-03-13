const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const teamSchema = new mongoose.Schema(
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
    designation: {
      type: String,
      default: "",
      required: [true, "Designation is required"],
      trim: true,
    },
    profile: {
      s3Url: { type: String, default: "" },
      s3Key: { type: String, default: "" },
    },
  },
  { collection: "team", timestamps: true }
);

// using paginate plugin
teamSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("team", teamSchema);
