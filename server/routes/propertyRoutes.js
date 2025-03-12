const express = require("express");
const router = express.Router();
const {
  getAllProperties,
  getSingleProperty,
  createProperty,
  updateProperty,
  deleteProperty,
} = require("../controllers/PropertyController");
const upload = require("../utils/fileUpload");

// Create and get all amenities
router
  .route("/")
  .get(getAllProperties)
  .post(
    upload.fields([
      { name: "banner", maxCount: 1 },
      { name: "image", maxCount: 100 },
    ]),
    createProperty
  );
// .post(createProperty);

// Get, update and delete single amenity
router
  .route("/:id")
  .get(getSingleProperty)
  .put(
    upload.fields([
      { name: "banner", maxCount: 1 },
      { name: "image", maxCount: 100 },
    ]),
    updateProperty
  )
  .delete(deleteProperty);

module.exports = router;
