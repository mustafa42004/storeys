const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const {
  createAmenity,
  getAllAmenities,
  getAmenity,
  updateAmenity,
  deleteAmenity,
} = require("../controllers/amenityController");

// Create and get all amenities
router
  .route("/")
  .post(authMiddleware.protect, createAmenity)
  .get(getAllAmenities);

// Get, update and delete single amenity
router
  .route("/:id")
  .get(authMiddleware.protect, getAmenity)
  .put(authMiddleware.protect, updateAmenity)
  .delete(authMiddleware.protect, deleteAmenity);

module.exports = router;
