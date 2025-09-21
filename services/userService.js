const users = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'meuSegredoJWT';

function registerUser({ name, password }) {
  if (!name || !password) 
    throw new Error('Nome e senha são obrigatórios');
  const exists = users.find(u => u.name === name);
  
  if (exists) 
    throw new Error('Usuário já existe');
  const hashed = bcrypt.hashSync(password, 8);
  const user = { name, password: hashed };
  users.push(user);
  return user;
}

function loginUser({ name, password }) {
  if (!name || !password) 
    throw new Error('Nome e senha são obrigatórios');
  const user = users.find(u => u.name === name);
  
  if (!user) 
    throw new Error('Usuário não encontrado');
  
  if (!bcrypt.compareSync(password, user.password)) 
    throw new Error('Senha inválida');
  return jwt.sign({ name: user.name }, SECRET, { expiresIn: '1h' });
}

function listUsers() {
  return users;
}

function verifyToken(token) {
  return jwt.verify(token, SECRET);
}

module.exports = { registerUser, loginUser, listUsers, verifyToken };
