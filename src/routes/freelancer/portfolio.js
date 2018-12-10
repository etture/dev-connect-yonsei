const express = require('express');
const router = express.Router();
const s3 = require('../../database/s3');

const PortfolioController = require('../../controllers/freelancer/portfolioController');

router.post('/getAll', PortfolioController.getAll);
router.post('/getInternal', PortfolioController.getInternal);
router.post('/getExternal', PortfolioController.getExternal);
router.post('/registerExternal', s3.single('attachment'), PortfolioController.registerExternal);

module.exports = router;