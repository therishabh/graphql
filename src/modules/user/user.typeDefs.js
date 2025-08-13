import { gql } from "apollo-server";

export const userTypeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String
    email: String!
    quotes: [Quote!]!
  }

  extend type Query {
    users: [User!]!
    user(id: ID!): User
    myProfile: User
  }

  input UserInput {
    firstName: String!
    lastName: String
    email: String!
    password: String!
  }

  input UserLoginInput {
    email: String!
    password: String!
  }

  input changePasswordInput {
    oldPassword: String!
    newPassword: String!
  }

  type Token {
    token: String!
  }

  extend type Mutation {
    signUp(userInput: UserInput): User
    login(userInput: UserLoginInput): Token
    changePassword(userInput: changePasswordInput): String
  }
`;
