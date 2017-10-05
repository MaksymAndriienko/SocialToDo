const express = require('express');
const router = express.Router();
var passport = require('passport');
const authenticationController = require('../controllers/authenticationController');
const mongoose = require('mongoose');
require('../config/passport')(passport);

router.get('/', (req, res) => {
  res.send('api works');
});

router.post('/user/signup', authenticationController.signup);
router.post('/user/authentication', authenticationController.signin);

module.exports = router;