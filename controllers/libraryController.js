const express = require('express');
const libraryService = require('../services/libraryService');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

async function addLibraryHandler(req, res) {
  try {
    const { title, year } = req.body;
    const lib = await libraryService.addLibrary({ title, year });
    return res.status(201).json(lib);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

async function listLibrariesHandler(req, res) {
  try {
    const libs = await libraryService.getAllLibraries();
    return res.status(200).json(libs);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

router.post('/addLibrary', authMiddleware, addLibraryHandler);
router.get('/listLibraries', listLibrariesHandler);

module.exports = { router, addLibraryHandler, listLibrariesHandler };
