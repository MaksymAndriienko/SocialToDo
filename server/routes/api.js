const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authenticationController');
const mongoose = require('mongoose');

router.get('/', (req, res) => {
  res.send('api works');
});

router.post('/user/authentication', authenticationController.signup);

module.exports = router;