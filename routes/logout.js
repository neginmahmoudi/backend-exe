const express = require("express");
const router = express.Router();
const logoutController = require("../controllers/authentication/LogoutController");
const verifyJWT = require("../middleware/verifyJWT");

router.get("/", verifyJWT,logoutController.logout);

module.exports = router;
