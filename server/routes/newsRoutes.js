const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../utils/fileUpload");

router
  .route("/")
  .get(newsController.getAllNews)
  .post(
    authMiddleware.protect,
    upload.fields([{ name: "banner", maxCount: 1 }]), 
    newsController.createNews
  );

router
  .route("/:id")
  .get(newsController.getSingleNews)
  .put(
    authMiddleware.protect,
    upload.fields([{ name: "banner", maxCount: 1 }]),
    newsController.updateNews
  )
  .delete(authMiddleware.protect, newsController.deleteNews);

module.exports = router;
