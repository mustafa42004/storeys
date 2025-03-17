const express = require("express");
const router = express.Router();
const newsController = require("../controllers/NewsController");
const { s3Upload } = require("../utils/s3");
const authMiddleware = require("../middlewares/authMiddleware");

router
  .route("/")
  .get(newsController.getAllNews)
  .post(
    authMiddleware.protect,
    s3Upload("news").single("banner"),
    newsController.createNews
  );

router
  .route("/:id")
  .get(newsController.getSingleNews)
  .patch(
    authMiddleware.protect,
    s3Upload("news").single("banner"),
    newsController.updateNews
  )
  .delete(authMiddleware.protect, newsController.deleteNews);

module.exports = router;
