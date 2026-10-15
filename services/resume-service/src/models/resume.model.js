import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    authUserId: {
      type: String,
      required: true
    },
    fileName: {
      type: String,
      required: true
    },
    fileUrl: {
      type: String,
      required: true
    },
    publicId: {
      type: String,
      default: ""
    },
    parsedText: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;
