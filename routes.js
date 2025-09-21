const express = require('express');
const router = express.Router();

const userController = require('./controllers/userController');
const libraryController = require('./controllers/libraryController');

router.use('/users', userController); // userController exports router
router.use('/library', libraryController.router); // libraryController exports router + handlers

module.exports = router;
