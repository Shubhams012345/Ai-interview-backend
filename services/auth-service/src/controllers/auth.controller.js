import {registerUser,loginUser,logoutUser,refreshAccessToken} from "../services/auth.service.js";
import { sendSuccess, sendError } from "../utils/apiResponse.js";
import env from "../config/env.js";
import getRefreshTokenCookieOptions from "../utils/cookieOptions.js";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return sendError(res, 400, "Name, email and password are required");
    }

    const result = await registerUser({ name, email, password });

    res.cookie(env.cookieName, result.refreshToken, getRefreshTokenCookieOptions());



    return sendSuccess(res, 201, "User registered successfully", {
      user: result.user,
      accessToken: result.accessToken
    });
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 400, "Email and password are required");
    }

    const result = await loginUser({ email, password });

    res.cookie(env.cookieName, result.refreshToken, getRefreshTokenCookieOptions());

    return sendSuccess(res, 200, "Login successful", {
      user: result.user,
      accessToken: result.accessToken
    });
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

const logout = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];

    if (!userId) {
      return sendError(res, 401, "User id is missing");
    }

    await logoutUser(userId);

    res.clearCookie(env.cookieName, getRefreshTokenCookieOptions());

    return sendSuccess(res, 200, "Logout successful");
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

const refresh = async (req, res) => {
  try {
    const incomingRefreshToken = req.cookies[env.cookieName];

    const result = await refreshAccessToken(incomingRefreshToken);

    res.cookie(env.cookieName, result.refreshToken, getRefreshTokenCookieOptions());

    return sendSuccess(res, 200, "Access token refreshed", {
      accessToken: result.accessToken
    });
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

export { register, login, logout, refresh };
