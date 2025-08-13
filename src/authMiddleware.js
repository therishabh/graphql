import jwt from "jsonwebtoken";
import { User } from "./models/user.model.js";

const SECRET_KEY = process.env.TOKEN_SECRET;
export const authMiddleware = async ({ req }) => {
  const token = req.headers.authorization;
  if (token) {
    try {
      const accessToken = token.replace("Bearer ", "");
      const decoded = jwt.verify(accessToken, SECRET_KEY);

      const user = await User.findById(decoded._id);

      return { user };
    } catch (error) {
      console.log("Invalid token");
    }
  }

  return {};
};
