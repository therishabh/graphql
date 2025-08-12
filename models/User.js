import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: Number,
  gender: String,
  city: String,
  country: String,
  joinedAt: {
    type: String,
    default: () => new Date().toISOString().split("T")[0],
  },
  isActive: { type: Boolean, default: true },
});

export default mongoose.model("User", userSchema);
