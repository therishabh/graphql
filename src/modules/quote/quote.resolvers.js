import { Quote } from "../../models/quote.model.js";
import { getAllQuotes } from "./quote.service.js";

export const quoteResolvers = {
  Query: {
    quotes: async () => await getAllQuotes,
  },

  Mutation: {
    createQuote: (_, args) => quoteService.createQuote(args),
  },
};
