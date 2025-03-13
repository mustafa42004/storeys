require("../config/dataBase");
const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    banner: {
      s3Url: { type: String, default: "" },
      s3Key: { type: String, default: "" },
    },
    image: [
      {
        s3Url: { type: String, default: "" },
        s3Key: { type: String, default: "" },
      },
    ],
    isFeatured: { type: Boolean, default: false },
    name: {
      type: String,
      required: [true, "Property name is required"],
      trim: true,
    },
    description: { type: String, default: "", trim: true },
    address: {
      type: String,
      default: "",
      trim: true,
      required: [true, "Property address is required"],
    },
    price: {
      type: Number,
      min: [0, "Room could not have less than 0 beds"],
      required: [true, "Property price is required"],
      default: 0,
    },
    type: {
      type: String, // Apartment, Villa, Land, Plot, etc.
      required: [true, "Property type is required"],
      default: "",
      trim: true,
    },
    bedrooms: {
      type: Number,
      required: [true, "Property must have minimum bedroom capacity"],
      min: [0, "Property could not have less than 0 bedrooms"],
      default: 0,
    },
    bathrooms: {
      type: Number,
      required: [true, "Property must have minimum bathroom capacity"],
      min: [0, "Property could not have less than 0 bathrooms"],
      default: 0,
    },
    sqft: {
      type: Number,
      required: [true, "Property must have minimum sqft capacity"],
      min: [0, "Property could not have less than 0 sqft"],
      default: 0,
    },
    parking: {
      type: Number,
      required: [true, "Property must have minimum parking capacity"],
      min: [0, "Property could not have less than 0 parking"],
      default: 0,
    },
    amenities: { type: [String], default: [] },
    status: {
      type: String,
      required: [true, "Property status is required"],
      default: "",
      trim: true,
    }, // rent, sale, lease, etc.
    propertyInfo: {
      type: {
        type: String,
        required: [true, "Property type is required"],
        default: "",
        trim: true,
      },
      purpose: {
        type: String,
        required: [true, "Property purpose is required"],
        default: "",
        trim: true,
      },
      reference: {
        type: Number,
        required: [true, "Property reference is required"],
        default: 0,
      },
      furnishing: { type: String, default: "" },
      createdDate: { type: Date, default: Date.now() },
    },
    buildingInfo: {
      name: { type: String, default: "", trim: true },
      floors: {
        type: Number,
        required: [true, "Building must have minimum floor capacity"],
        min: [0, "Building could not have less than 0 floors"],
        default: 0,
      },
      sqft: {
        type: Number,
        required: [true, "Building must have minimum sqft capacity"],
        min: [0, "Building could not have less than 0 sqft"],
        default: 0,
      },
      offices: {
        type: Number,
        required: [true, "Building must have minimum office capacity"],
        min: [0, "Building could not have less than 0 offices"],
        default: 0,
      },
    },
  },
  { collection: "property", timestamps: true }
);

module.exports = mongoose.model("property", propertySchema);
