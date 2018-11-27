const express = require('express');
const router = express.Router();

const SignupController = require('../controllers/signupController');

router.post('/freelancer', SignupController.freelancer);
router.post('/client', SignupController.client);

module.exports = router;