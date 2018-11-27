const express = require('express');
const router = express.Router();

const signin = require('./signin');
const signup = require('./signup');
const admin = require('./admin/index');
const freelancer = require('./freelancer/index');
const client = require('./client/index');

router.use('/signin', signin);
router.use('/signup', signup);
router.use('/admin', admin);
router.use('/freelancer', freelancer);
router.use('/client', client);

module.exports = router;