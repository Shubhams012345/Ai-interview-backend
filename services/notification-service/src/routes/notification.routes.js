import express from "express";
import {
  sendEmailNotification,
  sendJobAlert,
  sendInterviewReminder,
  getAll
} from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", getAll);
router.post("/email", sendEmailNotification);
router.post("/job-alert", sendJobAlert);
router.post("/interview-reminder", sendInterviewReminder);

export default router;
