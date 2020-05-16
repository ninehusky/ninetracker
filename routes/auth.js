const path = require('path');
const express = require('express');
const router = express.Router();

const HOMEDIR = path.join(__dirname, '..');
const authController = require(path.join(HOMEDIR, 'controllers', 'auths'));


router.get('/login', authController.authenticateApi);
router.get('/callback', authController.callback);

module.exports = router;