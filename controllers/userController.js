const express = require('express');
const userService = require('../services/userService');

const router = express.Router();

router.post('/register', (req, res) => {
  try {
    const user = userService.registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', (req, res) => {
  try {
    const token = userService.loginUser(req.body);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/list', (req, res) => {
  try {
    const users = userService.listUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
