const express = require('express');
const router = express.Router();
const s3 = require('../../database/s3');

const ProjectController = require('../../controllers/client/projectController');

router.post('/register', s3.single('req_doc'), ProjectController.register);
router.post('/getCurrent', ProjectController.getCurrent);
router.post('/getRegistered', ProjectController.getRegistered);
router.post('/getCompleted', ProjectController.getCompleted);
router.post('/getApplicants', ProjectController.getApplicants);
router.post('/acceptApplicant', ProjectController.acceptApplicant);

module.exports = router;