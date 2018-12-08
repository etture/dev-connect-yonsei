const express = require('express');
const router = express.Router();

const AccountController = require('../../controllers/admin/accountController');

// see list of accounts
router.post('/getFreelancers', AccountController.getFreelancers);
router.post('/getClients', AccountController.getClients);
router.post('/getAllUsers', AccountController.getAllUsers);
router.post('/getFreelancerByIdx', AccountController.getFreelancerByIdx);
router.post('/getClientByIdx', AccountController.getClientByIdx);

module.exports = router;