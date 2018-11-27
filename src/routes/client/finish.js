const express = require('express');
const router = express.Router();

const FinishController = require('../../controllers/client/finishController');

router.post('/getSubmissions', FinishController.getSubmissions);
router.post('/accept', FinishController.accept);
router.post('/reject', FinishController.reject);
router.post('/rate', FinishController.rate);

module.exports = router;