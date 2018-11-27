const express = require('express');
const router = express.Router();

const TeamController = require('../../controllers/freelancer/teamController');

router.post('/create', TeamController.create);
router.post('/join', TeamController.join);
router.post('/leave', TeamController.leave);
router.post('/apply', TeamController.apply);
router.post('/finish/submit', TeamController.submit);
router.post('/finish/rateClient', TeamController.rateClient);

module.exports = router;