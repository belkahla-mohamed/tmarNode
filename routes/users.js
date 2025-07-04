const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.post('/signup', usersController.signup);
router.post('/login', usersController.login);
router.get('/profile/:id', usersController.auth, usersController.profile);
router.put('/update/:id', usersController.auth, usersController.update);
router.post('/logout', usersController.auth, usersController.logout);

module.exports = router; 