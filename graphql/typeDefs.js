const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User 
  { name: String! }
  type Library 
  { title: String!, year: Int! }

  type Query {
    libraries: [Library]
  }

  type Mutation {
    resetLibraries: Boolean
    register(name: String!, password: String!): User
    login(name: String!, password: String!): String
    addLibrary(title: String!, year: Int!, token: String!): Library
  }
`;

module.exports = typeDefs;
