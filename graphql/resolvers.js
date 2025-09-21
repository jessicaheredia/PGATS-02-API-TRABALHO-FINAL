const userService = require('../services/userService');
const libraryService = require('../services/libraryService');

const resolvers = {
  Query: {
    libraries: () => libraryService.getAllLibraries()
  },
  Mutation: {
    resetLibraries: () => {
      return libraryService.resetLibraries();},
    
    register: (_, { name, password }) => userService.registerUser({ name, password }),
    
    login: (_, { name, password }) => userService.loginUser({ name, password }),
    
    addLibrary: (_, { title, year, token }) => { userService.verifyToken(token);
      return libraryService.addLibrary({ title, year });
      
    }
  }
};

module.exports = resolvers;
