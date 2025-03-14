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
    upload.fields([{ name: "profile", maxCount: 1 }]),
    teamController.createTeam
  );

router
  .route("/:id")
  .get(teamController.getSingleTeam)
  .put(
    authMiddleware.protect,
    upload.fields([{ name: "profile", maxCount: 1 }]),
    teamController.updateTeam
  )
  .delete(authMiddleware.protect, teamController.deleteTeam);

module.exports = router;
