import {
  createAndSendEmail,
  createJobAlert,
  createInterviewReminder,
  getUserNotifications
} from "../services/notification.service.js";
import { sendSuccess, sendError } from "../utils/apiResponse.js";

const sendEmailNotification = async (req, res) => {
  try {
    const authUserId = req.headers["x-user-id"];
    const { email, title, message } = req.body;

    if (!authUserId) {
      return sendError(res, 401, "User id is missing");
    }

    if (!email || !title || !message) {
      return sendError(res, 400, "Email, title and message are required");
    }

    const notification = await createAndSendEmail({
      authUserId,
      email,
      title,
      message
    });

    return sendSuccess(res, 201, "Email notification sent", { notification });
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

const sendJobAlert = async (req, res) => {
  try {
    const authUserId = req.headers["x-user-id"];
    const { email, title, message } = req.body;

    if (!authUserId) {
      return sendError(res, 401, "User id is missing");
    }

    if (!title || !message) {
      return sendError(res, 400, "Title and message are required");
    }

    const notification = await createJobAlert({
      authUserId,
      email,
      title,
      message
    });

    return sendSuccess(res, 201, "Job alert created", { notification });
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

const sendInterviewReminder = async (req, res) => {
  try {
    const authUserId = req.headers["x-user-id"];
    const { email, title, message } = req.body;

    if (!authUserId) {
      return sendError(res, 401, "User id is missing");
    }

    if (!title || !message) {
      return sendError(res, 400, "Title and message are required");
    }

    const notification = await createInterviewReminder({
      authUserId,
      email,
      title,
      message
    });

    return sendSuccess(res, 201, "Interview reminder created", { notification });
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

const getAll = async (req, res) => {
  try {
    const authUserId = req.headers["x-user-id"];

    if (!authUserId) {
      return sendError(res, 401, "User id is missing");
    }

    const notifications = await getUserNotifications(authUserId);

    return sendSuccess(res, 200, "Notifications fetched", { notifications });
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

export { sendEmailNotification, sendJobAlert, sendInterviewReminder, getAll };
