const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, default: "", required: [true, "Title is required"] },
    content: {
      type: String,
      default: "",
      required: [true, "Content is required"],
    },
    status: {
      type: String,
      default: "",
      required: [true, "Status is required"],
    },
    permalink: {
      type: String,
      default: "",
      unique: true,
      required: [true, "Permalink is required"],
    },
    banner: {
      s3Url: {
        type: String,
        default: "",
        required: [true, "Banner is required"],
      },
      s3Key: {
        type: String,
        default: "",
        required: [true, "Banner key is required"],
      },
    },
  },
  { collection: "news", timestamps: true }
);

// using paginate plugin
newsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("news", newsSchema);
