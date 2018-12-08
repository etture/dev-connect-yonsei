const express = require('express');
const router = express.Router();

const account = require('./account');
const project = require('./project');
const finish = require('./finish');

router.use('/account', account);
router.use('/project', project);
router.use('/finish', finish);

module.exports = router;