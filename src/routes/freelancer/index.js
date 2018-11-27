const express = require('express');
const router = express.Router();

const account = require('./account');
const portfolio = require('./portfolio');
const project = require('./project');
const team = require('./team');
const finish = require('./finish');

router.use('/account', account);
router.use('/portfolio', portfolio);
router.use('/project', project);
router.use('/team', team);
router.use('/finish', finish);

module.exports = router;