const express = require('express');
const router = express.Router();

const PortfolioController = require('../../controllers/freelancer/portfolioController');

router.post('/getAll', PortfolioController.getAll);
router.post('/getInternal', PortfolioController.getInternal);
router.post('/getExternal', PortfolioController.getExternal);
router.post('/registerExternal', PortfolioController.registerExternal);

module.exports = router;