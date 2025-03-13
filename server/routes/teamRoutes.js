const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");
const upload = require("../utils/multer");

router
  .route("/")
  .get(teamController.getAllTeam)
  .post(upload.single("profile"), teamController.createTeam);

router
  .route("/:id")
  .get(teamController.getSingleTeam)
  .put(upload.single("profile"), teamController.updateTeam)
  .delete(teamController.deleteTeam);

module.exports = router;
