const express = require('express');
const router = new express.Router();
const UserController = require('../controllers/user.controller');
const pause = require('../effects/pause');

router.post('/signup', pause, UserController.createUser);
router.post('/login', pause, UserController.loginUser);

module.exports = router;