const express = require("express");
const router = express.Router();
const registerController = require("../controllers/authentication/RegisterController");

router.post("/", registerController.register);

module.exports = router;
