import mongoose from "mongoose";

const appliedJobSchema = new mongoose.Schema(
  {
    authUserId: {
      type: String,
      required: true
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },
    status: {
      type: String,
      default: "Applied"
    }
  },
  { timestamps: true }
);

appliedJobSchema.index({ authUserId: 1, jobId: 1 }, { unique: true });

const AppliedJob = mongoose.model("AppliedJob", appliedJobSchema);

export default AppliedJob;
