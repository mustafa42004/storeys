const express = require("express");
const router = express.Router();
const careerController = require("../controllers/careerController");
const { s3Upload } = require("../utils/s3");
const authMiddleware = require("../middlewares/authMiddleware");

router
  .route("/")
  .get(authMiddleware.protect, careerController.getAllCareers)
  .post(s3Upload("career").single("resume"), careerController.createCareer);

router
  .route("/:id")
  .get(authMiddleware.protect, careerController.getSingleCareer)
  .put(
    authMiddleware.protect,
    s3Upload("career").single("resume"),
    careerController.updateCareer
  )
  .delete(authMiddleware.protect, careerController.deleteCareer);

module.exports = router;
