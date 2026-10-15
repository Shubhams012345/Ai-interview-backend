import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema(
  {
    authUserId: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      default: ""
    },
    education: {
      type: String,
      default: ""
    },
    skills: {
      type: [String],
      default: []
    },
    experience: {
      type: String,
      default: ""
    },
    preferences: {
      jobRole: {
        type: String,
        default: ""
      },
      location: {
        type: String,
        default: ""
      },
      jobType: {
        type: String,
        default: ""
      }
    },
    profileImage: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

export default UserProfile;
