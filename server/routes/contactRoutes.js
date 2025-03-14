const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const authMiddleware = require("../middlewares/auth.middleware");

router.route("/").post(contactController.createContact);

router.use(authMiddleware.protect);

router.route("/").get(contactController.getAllContacts);

router
  .route("/:id")
  .get(contactController.getContact)
  .put(contactController.updateContact)
  .delete(contactController.deleteContact);

module.exports = router;
