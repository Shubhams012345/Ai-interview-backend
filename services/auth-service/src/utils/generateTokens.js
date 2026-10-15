import jwt from "jsonwebtoken";
import env from "../config/env.js";

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, env.jwtAccessSecret, {
    expiresIn: env.accessTokenExpiresIn
  });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, env.jwtRefreshSecret, {
    expiresIn: env.refreshTokenExpiresIn
  });
};

export { generateAccessToken, generateRefreshToken };
