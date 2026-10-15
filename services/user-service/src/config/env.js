import dotenv from "dotenv";

dotenv.config();

const env = {
  port: process.env.PORT || 8002,
  mongoUri: process.env.MONGO_URI,
  redisUrl: process.env.REDIS_URL,
  nodeEnv: process.env.NODE_ENV || "development"
};

export default env;
