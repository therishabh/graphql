import { gql } from "apollo-server";

const typeDefs = gql`
  # User Type
  type User {
    id: ID!
    name: String!
    email: String
    age: Int
    gender: String
    city: String
    country: String
    joinedAt: String
    isActive: Boolean
    quotes: [Quote]
  }

  # Quote Type
  type Quote {
    id: ID!
    text: String
    user: User
  }

  type Query {
    users: [User]
    quotes: [Quote]
    user(id: ID!): User
    quote(id: ID!): Quote
  }

  type Mutation {
    addUser(
      name: String!
      email: String
      age: Int
      gender: String
      city: String
      country: String
      joinedAt: String
      isActive: Boolean
    ): User

    updateUser(
      id: ID!
      name: String!
      email: String!
      age: Int
      gender: String
      city: String
      country: String
      joinedAt: String
      isActive: Boolean
    ): User

    deleteUser(id: ID!): String
  }
`;

export default typeDefs;
