import mongoose from "mongoose";
import env from "./env.js";

const connectDb = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log("Resume Service MongoDB connected");
  } catch (error) {
    console.error("Resume Service MongoDB connection failed", error.message);
    process.exit(1);
  }
};

export default connectDb;
