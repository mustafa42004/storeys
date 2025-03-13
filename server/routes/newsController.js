const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");
const upload = require("../utils/multer");

router
  .route("/")
  .get(newsController.getAllNews)
  .post(upload.single("banner"), newsController.createNews);

router
  .route("/:id")
  .get(newsController.getSingleNews)
  .put(upload.single("banner"), newsController.updateNews)
  .delete(newsController.deleteNews);

module.exports = router;
