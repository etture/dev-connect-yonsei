const express = require('express');
const router = express.Router();

const TeamController = require('../../controllers/admin/teamController');

router.put('/modify', TeamController.modify);
router.delete('/delete', TeamController.delete);

module.exports = router;