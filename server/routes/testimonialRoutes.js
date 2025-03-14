const express = require("express");
const router = express.Router();
const testimonialController = require("../controllers/testimonialController");
const { s3Upload } = require("../utils/s3");
const authMiddleware = require("../middlewares/authMiddleware");

router
  .route("/")
  .get(testimonialController.getAllTestimonials)
  .post(
    authMiddleware.protect,
    s3Upload("testimonials").single("image"),
    testimonialController.createTestimonial
  );

router
  .route("/:id")
  .get(testimonialController.getTestimonial)
  .patch(
    authMiddleware.protect,
    s3Upload("testimonials").single("image"),
    testimonialController.updateTestimonial
  )
  .delete(authMiddleware.protect, testimonialController.deleteTestimonial);

module.exports = router;
