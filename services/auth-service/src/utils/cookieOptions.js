import env from "../config/env.js";

const getRefreshTokenCookieOptions = () => {
  return {
    httpOnly: true,
    secure: env.nodeEnv === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
  };
};

export default getRefreshTokenCookieOptions;
