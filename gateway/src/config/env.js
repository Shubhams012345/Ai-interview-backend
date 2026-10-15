import dotenv from "dotenv";

dotenv.config();

const env = {
  port: process.env.PORT || 6000,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  authServiceUrl: process.env.AUTH_SERVICE_URL,
  userServiceUrl: process.env.USER_SERVICE_URL,
  resumeServiceUrl: process.env.RESUME_SERVICE_URL,
  jobServiceUrl: process.env.JOB_SERVICE_URL,
  interviewServiceUrl: process.env.INTERVIEW_SERVICE_URL,
  notificationServiceUrl: process.env.NOTIFICATION_SERVICE_URL,
  nodeEnv: process.env.NODE_ENV || "development"
};

export default env;
