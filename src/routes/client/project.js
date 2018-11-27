const express = require('express');
const router = express.Router();

const ProjectController = require('../../controllers/client/projectController');

router.post('/register', ProjectController.register);
router.post('/getCurrent', ProjectController.getCurrent);
router.post('/getRegistered', ProjectController.getRegistered);
router.post('/getCompleted', ProjectController.getCompleted);
router.post('/getApplicants', ProjectController.getApplicants);
router.post('/acceptApplicant', ProjectController.acceptApplicant);

module.exports = router;