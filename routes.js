const express = require('express');
const router = express.Router();

const userController = require('./controllers/userController');
const libraryController = require('./controllers/libraryController');

router.use('/users', userController);
router.use('/library', libraryController.router);

module.exports = router;
