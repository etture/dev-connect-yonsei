const express = require('express');
const router = express.Router();

const accountDelete = require('./accountDelete');
const project = require('./project');
const team = require('./team');

router.use('/account/delete', accountDelete);
router.use('/project', project);
router.use('/team', team);

module.exports = router;