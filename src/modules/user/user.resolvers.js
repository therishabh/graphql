import {
  changePasswordService,
  loginService,
  signUpService,
} from "./user.service.js";

export const userResolvers = {
  Query: {
    users: async () => await User.find(),
  },

  Mutation: {
    signUp: async (_, { userInput }) => signUpService(userInput),
    login: async (_, { userInput }) => loginService(userInput),
    changePassword: async (_, { userInput }, context) =>
      changePasswordService(userInput, context),
  },
};
