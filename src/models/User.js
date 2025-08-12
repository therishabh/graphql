import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: Number,
    gender: String,
    city: String,
    country: String,
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook for hashing password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // skip if password not modified
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export default mongoose.model("User", userSchema);
