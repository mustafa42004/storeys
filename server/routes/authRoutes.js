const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.use(authMiddleware.protect);
router.patch("/change-password", authController.changePassword);

module.exports = router;
