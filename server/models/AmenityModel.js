const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const amenitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: [true, "Amenity must have a name"],
    },
  },
  {
    timestamps: true,
  }
);

// using paginate plugin
amenitySchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Amenity", amenitySchema);
