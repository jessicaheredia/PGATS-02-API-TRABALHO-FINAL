const libraries = require('../models/libraryModel');

function addLibrary({ title, year }) {
  if (!title || !year) 
    throw new Error('Informe o titulo do livro e ano de publicacao');
  const exists = libraries.find(l => l.title === title);
  
  if (exists) 
    throw new Error('Titulo duplicado: Biblioteca ja possui esse titulo cadastrado');
  const lib = { title, year };
  libraries.push(lib);
  return lib;
}

function getAllLibraries() {
  return libraries;
}

function resetLibraries() {
  libraries.length = 0;
  return true;
}

module.exports = { addLibrary, getAllLibraries, resetLibraries };
