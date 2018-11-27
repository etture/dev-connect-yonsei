const express = require('express');
const router = express.Router();

const SigninController = require('../controllers/signinController');

router.post('/admin', SigninController.admin);
router.post('/freelancer', SigninController.freelancer);
router.post('/client', SigninController.client);

module.exports = router;