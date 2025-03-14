const express = require("express");
const router = express.Router();
const testimonialController = require("../controllers/testimonialController");
const upload = require("../utils/fileUpload");
const authMiddleware = require("../middlewares/authMiddleware");

router
  .route("/")
  .get(testimonialController.getAllTestimonials)
  .post(
    authMiddleware.protect,
    upload.fields([{ name: "image", maxCount: 1 }]),
    testimonialController.createTestimonial
  );

router
  .route("/:id")
  .get(testimonialController.getTestimonial)
  .put(
    authMiddleware.protect,
    upload.fields([{ name: "image", maxCount: 1 }]),
    testimonialController.updateTestimonial
  )
  .delete(authMiddleware.protect, testimonialController.deleteTestimonial);

module.exports = router;
