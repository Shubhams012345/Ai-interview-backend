import dotenv from "dotenv";

dotenv.config();

const env = {
  port: process.env.PORT || 8006,
  mongoUri: process.env.MONGO_URI,
  smtpHost: process.env.SMTP_HOST,
  smtpPort: Number(process.env.SMTP_PORT) || 587,
  smtpUser: process.env.SMTP_USER,
  smtpPass: process.env.SMTP_PASS,
  fromEmail: process.env.FROM_EMAIL,
  nodeEnv: process.env.NODE_ENV || "development"
};

export default env;
