import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    company: {
      type: String,
      required: true
    },
    location: {
      type: String,
      default: "Remote"
    },
    description: {
      type: String,
      required: true
    },
    skills: {
      type: [String],
      default: []
    },
    experienceLevel: {
      type: String,
      default: "Fresher"
    },
    jobType: {
      type: String,
      default: "Full-time"
    }
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
