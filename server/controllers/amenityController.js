const Amenity = require("../models/AmenityModel");

// Create a new amenity
exports.createAmenity = async (req, res) => {
  try {
    const amenity = new Amenity(req.body);
    await amenity.save();
    res.status(201).json({
      success: true,
      data: amenity,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Get all amenities
exports.getAllAmenities = async (req, res) => {
  try {
    const amenities = await Amenity.find();
    res.status(200).json({
      success: true,
      count: amenities.length,
      data: amenities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get single amenity
exports.getAmenity = async (req, res) => {
  try {
    const amenity = await Amenity.findById(req.params.id);
    if (!amenity) {
      return res.status(404).json({
        success: false,
        error: "Amenity not found",
      });
    }
    res.status(200).json({
      success: true,
      data: amenity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Update amenity
exports.updateAmenity = async (req, res) => {
  try {
    const amenity = await Amenity.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!amenity) {
      return res.status(404).json({
        success: false,
        error: "Amenity not found",
      });
    }
    res.status(200).json({
      success: true,
      data: amenity,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete amenity
exports.deleteAmenity = async (req, res) => {
  try {
    const amenity = await Amenity.findByIdAndDelete(req.params.id);
    if (!amenity) {
      return res.status(404).json({
        success: false,
        error: "Amenity not found",
      });
    }
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
