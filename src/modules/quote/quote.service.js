import { Quote } from "../../models/quote.model.js";

export const getAllQuotes = async () => await Quote.find();
export const createQuote = async ({ userId, name }) => {
  const quote = new Quote({
    name,
    by: userId,
  });
  await quote.save();
  return "Quote saved successfully";
};
