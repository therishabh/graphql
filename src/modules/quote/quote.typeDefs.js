import { gql } from "apollo-server";

export const quoteTypeDefs = gql`
  type Quote {
    name: String!
    by: ID!
    user: User
  }

  extend type Query {
    quotes: [Quote!]!
    quote(_id: ID!): Quote
  }

  extend type Mutation {
    createQuote(name: String!): String
  }
`;
