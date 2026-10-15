import Notification from "../models/notification.model.js";
import sendEmail from "../utils/sendEmail.js";

const createAndSendEmail = async ({ authUserId, email, title, message }) => {
  await sendEmail({
    to: email,
    subject: title,
    text: message
  });

  const notification = await Notification.create({
    authUserId,
    type: "email",
    title,
    message,
    email
  });

  return notification;
};

const createJobAlert = async ({ authUserId, email, title, message }) => {
  if (email) {
    await sendEmail({
      to: email,
      subject: title,
      text: message
    });
  }

  const notification = await Notification.create({
    authUserId,
    type: "job-alert",
    title,
    message,
    email: email || ""
  });

  return notification;
};

const createInterviewReminder = async ({ authUserId, email, title, message }) => {
  if (email) {
    await sendEmail({
      to: email,
      subject: title,
      text: message
    });
  }

  const notification = await Notification.create({
    authUserId,
    type: "interview-reminder",
    title,
    message,
    email: email || ""
  });

  return notification;
};

const getUserNotifications = async (authUserId) => {
  return Notification.find({ authUserId }).sort({ createdAt: -1 });
};

export {
  createAndSendEmail,
  createJobAlert,
  createInterviewReminder,
  getUserNotifications
};
