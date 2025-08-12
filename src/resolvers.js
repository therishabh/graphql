import { users, quotes } from "../fakedb.js";
// import { v4 as uuidv4 } from "uuid";
import User from "./models/User.js";

const resolvers = {
  Query: {
    users: async () => await User.find(),
    user: async (_, { id }) => await User.findById(id),
    quotes: () => quotes,
    quote: (_, { id }) => quotes.find((quote) => quote.id === id),
  },
  User: {
    quotes: (parent) => {
      return quotes.filter((quote) => quote.userId === parent.id);
    },
  },
  Quote: {
    user: async (parent) => {
      return await User.findById(parent.userId);
    },
  },

  Mutation: {
    addUser: async (_, args) => {
      // Check if user with same email exists
      const existingUser = await User.findOne({ email: args.email });
      if (existingUser) {
        const error = new Error(
          "Email already registered, Please use another email."
        );
        error.code = "EMAIL_EXISTS";
        throw error;
      }

      const user = new User(args);
      return await user.save();
    },

    updateUser: async (_, { id, ...fields }) => {
      return await User.findByIdAndUpdate(id, fields, { new: true });
    },

    deleteUser: async (_, { id }) => {
      await User.findByIdAndDelete(id);
      return `User with ID ${id} deleted successfully`;
    },
  },
};

export default resolvers;
