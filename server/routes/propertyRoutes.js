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
const authMiddleware = require("../middlewares/auth.middleware");
// Create and get all amenities
router
  .route("/")
  .get(getAllProperties)
  .post(
    authMiddleware.protect,
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
    authMiddleware.protect,
    upload.fields([
      { name: "banner", maxCount: 1 },
      { name: "image", maxCount: 100 },
    ]),
    updateProperty
  )
  .delete(authMiddleware.protect, deleteProperty);

module.exports = router;
