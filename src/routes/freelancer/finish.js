const express = require('express');
const router = express.Router();

const FinishController = require('../../controllers/freelancer/finishController');

router.post('/submit', FinishController.submit);
router.post('/rateClient', FinishController.rateClient);

module.exports = router;