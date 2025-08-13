import { User } from "../../models/user.model.js";

const signUpService = async (userInput) => {
  // Check if user with same email exists
  const existingUser = await User.findOne({ email: userInput?.email });
  if (existingUser) {
    const error = new Error(
      "Email already registered, Please use another email."
    );
    error.code = "EMAIL_EXISTS";
    throw error;
  }

  const user = new User(userInput);
  return await user.save();
};

const loginService = async (userInput) => {
  const user = await User.findOne({ email: userInput.email });
  if (!user) {
    const error = new Error("User does not exist with this email id");
    error.code = "USER_NOT_EXIST";
    throw error;
  }

  const isPasswordValid = await user.isPasswordCorrect(userInput.password);
  if (!isPasswordValid) {
    const error = new Error("invalid user credentials");
    error.code = "INVALID_CREDENTIALS";
    throw error;
  }

  const token = await user.generateToken();
  return { token: token };
};

const changePasswordService = async (userInput, context) => {
  try {
    if (!context?.user) {
      const error = new Error("invalid token");
      error.code = "INVALID_TOKEN";
      throw error;
    }

    const userInfo = context.user;
    const user = await User.findById(userInfo._id);
    const isPasswordValid = await user.isPasswordCorrect(userInput.oldPassword);

    if (!isPasswordValid) {
      const error = new Error("old password is not valid");
      error.code = "INVALID_CREDENTIALS";
      throw error;
    }

    user.password = userInput.newPassword;
    await user.save({ validateBeforeSave: false });

    return "Password successfully changed";
  } catch (error) {}
};

export { signUpService, loginService, changePasswordService };
