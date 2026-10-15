import dotenv from "dotenv";

dotenv.config();

const env = {
  port: process.env.PORT || 8004,
  mongoUri: process.env.MONGO_URI,
  redisUrl: process.env.REDIS_URL,
  geminiApiKey: process.env.GEMINI_API_KEY,
  geminiModel: process.env.GEMINI_MODEL || "gemini-1.5-flash",
  nodeEnv: process.env.NODE_ENV || "development"
};

export default env;
