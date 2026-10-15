import nodemailer from "nodemailer";
import env from "./env.js";

const mailTransporter = nodemailer.createTransport({
  host: env.smtpHost,
  port: env.smtpPort,
  secure: false,
  auth: {
    user: env.smtpUser,
    pass: env.smtpPass
  }
});

export default mailTransporter;
