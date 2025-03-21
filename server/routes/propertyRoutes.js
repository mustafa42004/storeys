const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/PropertyController");
const { s3Upload } = require("../utils/s3");
const authMiddleware = require("../middlewares/authMiddleware");

const propertyUpload = s3Upload("properties").fields([
  { name: "banner", maxCount: 1 },
  { name: "image", maxCount: 10 },
]);

router.get("/cities", propertyController.getCities);
router.get("/search", propertyController.searchProperties);

router.patch(
  "/toggle-featured/:id",
  authMiddleware.protect,
  propertyController.toggleFeaturedProperty
);

router
  .route("/")
  .get(propertyController.getAllProperties)
  .post(
    authMiddleware.protect,
    propertyUpload,
    propertyController.createProperty
  );

router
  .route("/:id")
  .get(propertyController.getSingleProperty)
  .patch(
    authMiddleware.protect,
    propertyUpload,
    propertyController.updateProperty
  )
  .delete(authMiddleware.protect, propertyController.deleteProperty);

module.exports = router;
