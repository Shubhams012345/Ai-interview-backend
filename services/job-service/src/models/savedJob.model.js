import mongoose from "mongoose";

const savedJobSchema = new mongoose.Schema(
  {
    authUserId: {
      type: String,
      required: true
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    }
  },
  { timestamps: true }
);

savedJobSchema.index({ authUserId: 1, jobId: 1 }, { unique: true });

const SavedJob = mongoose.model("SavedJob", savedJobSchema);

export default SavedJob;
