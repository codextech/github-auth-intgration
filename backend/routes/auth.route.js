const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { verifyToken } = require('../helpers/jwt.helper');

router.get('/github/auth-url', authController.getGithubAuthUrl);
router.get('/github/callback', authController.handleGithubAuthCallback);
router.get('/github/status',verifyToken, authController.getGithubUserStatus);
router.delete('/github/remove',verifyToken, authController.removeGithubIntegration);

module.exports = router;
