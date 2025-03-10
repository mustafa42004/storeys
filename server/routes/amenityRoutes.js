const express = require("express");
const router = express.Router();
const {
  createAmenity,
  getAllAmenities,
  getAmenity,
  updateAmenity,
  deleteAmenity,
} = require("../controllers/amenityController");

// Create and get all amenities
router.route("/").post(createAmenity).get(getAllAmenities);

// Get, update and delete single amenity
router.route("/:id").get(getAmenity).put(updateAmenity).delete(deleteAmenity);

module.exports = router;
