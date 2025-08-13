import { gql } from "apollo-server";
import { userTypeDefs } from "./modules/user/user.typeDefs.js";
import { quoteTypeDefs } from "./modules/quote/quote.typeDefs.js";
import { userResolvers } from "./modules/user/user.resolvers.js";
import { quoteResolvers } from "./modules/quote/quote.resolvers.js";
import _ from "lodash";

const rootTypeDefs = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

const typeDefs = [rootTypeDefs, userTypeDefs, quoteTypeDefs];
const resolvers = _.merge({}, userResolvers, quoteResolvers);

export { typeDefs, resolvers };
