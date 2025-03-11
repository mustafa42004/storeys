require("../config/dataBase");
const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    banner: {
      s3Url: { type: String, default: "" },
      s3Key: { type: String, default: "" },
    },
    name: { type: String, default: "" },
    address: { type: String, default: "" },
    type: { type: String, default: "" },
    amenities: { type: [String], default: [] },
    description: { type: Array, default: [] },
    bedrooms: { type: Number, default: null }, // Allow null if no value is provided
    bathrooms: { type: Number, default: null }, // Allow null if no value is provided
    status: { type: String, default: "" },
    parking: { type: Number, default: null }, // Allow null if no value is provided
    price: { type: Number, default: null }, // Allow null if no value is provided
    sqft: { type: Number, default: null }, // Allow null if no value is provided
    createdDate: { type: Date, default: Date.now() },
    updatedDate: { type: Date, default: Date.now() },
    image: [
      {
        s3Url: { type: String, default: "" },
        s3Key: { type: String, default: "" },
      },
    ],
    propertyInfo: {
      type: { type: String, default: "" },
      purpose: { type: String, default: "" },
      reference: { type: Number, default: 0 },
      furnishing: { type: String, default: "" },
      createdDate: { type: Date, default: Date.now() },
    },
    buildingInfo: {
      name: { type: String, default: "" },
      floors: { type: Number, default: 0 },
      sqft: { type: Number, default: null },
      offices: { type: Number, default: 0 },
    },
  },
  { collection: "property" }
);

module.exports = mongoose.model("property", propertySchema);
