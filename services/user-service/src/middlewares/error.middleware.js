import { sendError } from "../utils/apiResponse.js";

const errorMiddleware = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";
  return sendError(res, statusCode, message);
};

export default errorMiddleware;
