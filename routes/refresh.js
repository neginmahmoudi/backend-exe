const express = require('express');
const router = express.Router();
const refreshTokenController = require('../controllers/authentication/RefreshTokenController');
const verifyJWT = require('../middleware/verifyJWT');

router.get('/',verifyJWT, refreshTokenController.refreshToken);

module.exports = router;