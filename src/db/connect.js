import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      process.env.MONGO_DB_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(
      `\n MongoDB connected ✅, DB HOST: ${connectionInstance.connection.host} \n`
    );
  } catch (error) {
    console.log("❌ MONGO DB connection error", error);
    process.exit(1);
  }
};

export default connectDB;
