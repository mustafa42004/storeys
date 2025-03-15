const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");
const { s3Upload } = require("../utils/s3");
const authMiddleware = require("../middlewares/authMiddleware");

router
  .route("/")
  .get(teamController.getAllTeam)
  .post(
    authMiddleware.protect,
    s3Upload("team").single("profile"),
    teamController.createTeam
  );

router
  .route("/:id")
  .get(teamController.getSingleTeam)
  .put(
    authMiddleware.protect,
    s3Upload("team").single("profile"),
    teamController.updateTeam
  )
  .delete(authMiddleware.protect, teamController.deleteTeam);

module.exports = router;
