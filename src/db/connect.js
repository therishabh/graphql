import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_DB_URI;

const connectDB = async () => {
  if (!MONGO_URI) throw new Error("MONGO_URI not defined in env");
  try {
    const connectionInstance = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `\n MongoDB connected ✅, DB HOST: ${connectionInstance.connection.host} \n`
    );
  } catch (error) {
    console.log("❌ MONGO DB connection error", error);
    process.exit(1);
  }
};

export default connectDB;
