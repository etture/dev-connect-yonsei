const express = require('express');
const router = express.Router();

const AccountDeleteController = require('../../controllers/admin/accountDeleteController');

router.delete('/freelancer', AccountDeleteController.freelancer);
router.delete('/client', AccountDeleteController.client);

module.exports = router;