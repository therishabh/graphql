import { users, quotes } from "./fakedb.js";

const resolvers = {
  Query: {
    users: () => users,
    user: (_, { id }) => users.find((user) => user.id === id),
    quotes: () => quotes,
    quote: (_, { id }) => quotes.find((quote) => quote.id === id),
  },
  User: {
    quotes: (parent) => {
      return quotes.filter((quote) => quote.userId === parent.id);
    },
  },
  Quote: {
    user: (parent) => {
      return users.find((user) => user.id === parent.userId);
    },
  },
};

export default resolvers;
