const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication/AuthController');
const verifyJWT = require('../middleware/verifyJWT');

router.post('/',verifyJWT, authController.login);

module.exports = router;