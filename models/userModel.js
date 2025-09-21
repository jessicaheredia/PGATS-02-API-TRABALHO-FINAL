const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'jessica',
    password: bcrypt.hashSync('123456', 8)
  }
];

module.exports = users;
