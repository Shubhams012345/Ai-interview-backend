import jwt from "jsonwebtoken";
import env from "../config/env.js";
import { sendError } from "../utils/apiResponse.js";

const publicRoutes = [
  { method: "POST", path: "/api/v1/auth/register" },
  { method: "POST", path: "/api/v1/auth/login" },
  { method: "POST", path: "/api/v1/auth/refresh" }
];

const isPublicRoute = (req) => {
  return publicRoutes.some((route) => {
    return route.method === req.method && route.path === req.path;
  });
};

const verifyAccessToken = (req, res, next) => {
  try {
    if (req.path === "/health") {
      return next();
    }

    // Login, register and refresh should work without an access token.
    if (isPublicRoute(req)) {
      return next();
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return sendError(res, 401, "Access token is missing");
    }

    const accessToken = authHeader.split(" ")[1];
    const decoded = jwt.verify(accessToken, env.jwtAccessSecret);

    // Downstream services trust this header instead of parsing JWT again.
    req.headers["x-user-id"] = decoded.userId;

    return next();
  } catch (error) {
    return sendError(res, 401, "Invalid or expired access token");
  }
};


export default verifyAccessToken;
