const express = require('express');
const router = express.Router();

const accountDelete = require('./accountDelete');
const project = require('./project');
const team = require('./team');

const AccountController = require('../../controllers/admin/accountController');

router.use('/account/delete', accountDelete);
router.use('/project', project);
router.use('/team', team);

// see list of accounts
router.get('/getFreelancers', AccountController.getFreelancers);
router.get('/getClients', AccountController.getClients);
router.get('/getAllUsers', AccountController.getAllUsers);

module.exports = router;