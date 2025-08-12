import { users, quotes } from "./fakedb.js";
import { v4 as uuidv4 } from "uuid";

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

  Mutation: {
    addUser: (
      _,
      { name, email, age, gender, city, country, joinedAt, isActive }
    ) => {
      const newEntry = {
        id: uuidv4(),
        name,
        email,
        age,
        gender,
        city,
        country,
        joinedAt: joinedAt || new Date().toISOString().split("T")[0],
        isActive: isActive ?? true,
      };

      users.push(newEntry);
      return newEntry;
    },

    updateUser: (_, { id, ...fields }) => {
      const userIndex = users.findIndex((user) => user.id === id);
      if (userIndex === -1) return null;
      users[userIndex] = { ...users[userIndex], ...fields };
      return users[userIndex];
    },

    deleteUser: (_, { id }) => {
      const userIndex = users.findIndex((user) => user.id === id);
      if (userIndex === -1) return null;
      users.splice(userIndex, 1);
      return `User with ID ${id} deleted successfully`;
    },
  },
};

export default resolvers;
