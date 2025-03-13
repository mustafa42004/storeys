const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");
const upload = require("../utils/fileUpload");
const authMiddleware = require("../middlewares/auth.middleware");

router
  .route("/")
  .get(teamController.getAllTeam)
  .post(
    authMiddleware.protect,
    upload.single("profile"),
    teamController.createTeam
  );

router
  .route("/:id")
  .get(teamController.getSingleTeam)
  .put(
    authMiddleware.protect,
    upload.single("profile"),
    teamController.updateTeam
  )
  .delete(authMiddleware.protect, teamController.deleteTeam);

module.exports = router;
