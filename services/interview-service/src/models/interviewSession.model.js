import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["interviewer", "candidate"],
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  { _id: false }
);

const interviewSessionSchema = new mongoose.Schema(
  {
    authUserId: {
      type: String,
      required: true
    },
    interviewType: {
      type: String,
      enum: ["technical", "hr", "coding"],
      required: true
    },
    jobRole: {
      type: String,
      required: true
    },
    experienceLevel: {
      type: String,
      required: true
    },
    conversation: {
      type: [conversationSchema],
      default: []
    },
    score: {
      type: Number,
      default: null
    },
    feedback: {
      type: String,
      default: ""
    },
    status: {
      type: String,
      enum: ["in-progress", "completed"],
      default: "in-progress"
    }
  },
  { timestamps: true }
);

const InterviewSession = mongoose.model("InterviewSession", interviewSessionSchema);

export default InterviewSession;
