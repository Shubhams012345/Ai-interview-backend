import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    authUserId: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ["email", "job-alert", "interview-reminder"],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    email: {
      type: String,
      default: ""
    },
    isRead: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
