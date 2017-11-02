const express = require('express');
const router = express.Router();
var passport = require('passport');
var jwt = require('jwt-simple');
var config = require('../config/database');
var User = require('../database/users');
const authenticationController = require('../controllers/authenticationController');
const taskController = require('../controllers/taskController');
const imagesController = require('../controllers/imagesController');
const profileController = require('../controllers/profileController');
const mongoose = require('mongoose');
require('../config/passport')(passport);


router.get('/', (req, res) => {
  res.send('api works');
});

router.post('/user/signup', authenticationController.signup);
router.post('/user/authentication', authenticationController.signin);
router.post('/task/api', taskController.addTask);
router.post('/image', imagesController.decodeImg);
router.get('/profile/:id', profileController.getUserProgile);
router.post('/profile/edit/:id', profileController.editUserProfile);

router.get('/memberinfo', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  console.log(config.secret);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      username: decoded.username
    }, function(err, user) {
        if (err) throw err;
 
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          res.json({success: true, msg: 'Welcome in the member area ' + user.username + '!'});
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
 
getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;