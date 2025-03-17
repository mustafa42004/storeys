const express = require("express");
const router = express.Router();
const communityController = require("../controllers/CommunityController");
const { s3Upload } = require("../utils/s3");
const authMiddleware = require("../middlewares/authMiddleware");

router
  .route("/")
  .get(communityController.getAllCommunities)
  .post(
    authMiddleware.protect,
    s3Upload("community").single("banner"),
    communityController.createCommunity
  );

router
  .route("/:id")
  .get(communityController.getCommunity)
  .patch(
    authMiddleware.protect,
    s3Upload("community").single("banner"),
    communityController.updateCommunity
  )
  .delete(authMiddleware.protect, communityController.deleteCommunity);

module.exports = router;
