import dotenv from "dotenv";

dotenv.config();

const env = {
  port: process.env.PORT || 6001,
  mongoUri: process.env.MONGO_URI,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m",
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
  cookieName: process.env.COOKIE_NAME || "refreshToken",
  nodeEnv: process.env.NODE_ENV || "development"
};

export default env;
