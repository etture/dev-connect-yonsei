const express = require('express');
const router = express.Router();

const ProjectController = require('../../controllers/admin/projectController');

router.get('/getAll', ProjectController.getAll);
router.put('/modify', ProjectController.modify);
router.delete('/delete', ProjectController.delete);

module.exports = router;