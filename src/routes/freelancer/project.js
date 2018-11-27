const express = require('express');
const router = express.Router();

const ProjectController = require('../../controllers/freelancer/projectController');

router.get('/getAll', ProjectController.getAll);
router.post('/getForMe', ProjectController.getForMe);
router.post('/getInfo', ProjectController.getInfo);
router.post('/apply', ProjectController.apply);
router.post('/getApplied', ProjectController.getApplied);
router.post('/getCurrent', ProjectController.getCurrent);

module.exports = router;