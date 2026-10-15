import express from "express";
import cors from "cors";
import env from "./config/env.js";
import verifyAccessToken from "./middlewares/auth.middleware.js";
import createServiceProxy from "./config/proxy.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use((req, res, next) => {
  const contentType = req.headers["content-type"] || "";

  if (contentType.includes("multipart/form-data")) {
    return next();
  }

  return express.json()(req, res, next);
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Gateway is running",
    data: {}
  });
});

app.use(verifyAccessToken);

app.use("/api/v1/auth", createServiceProxy(env.authServiceUrl));
app.use("/api/v1/users", createServiceProxy(env.userServiceUrl));
app.use("/api/v1/resumes", createServiceProxy(env.resumeServiceUrl));
app.use("/api/v1/jobs", createServiceProxy(env.jobServiceUrl));
app.use("/api/v1/interviews", createServiceProxy(env.interviewServiceUrl));
app.use("/api/v1/notifications", createServiceProxy(env.notificationServiceUrl));

app.use(errorMiddleware);

export default app;
