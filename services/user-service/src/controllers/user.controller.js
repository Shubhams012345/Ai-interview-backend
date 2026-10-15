import { getUserProfile, updateUserProfile } from "../services/user.service.js";
import { sendSuccess, sendError } from "../utils/apiResponse.js";

const getProfile = async (req, res) => {
  try {
    const authUserId = req.headers["x-user-id"];

    if (!authUserId) {
      return sendError(res, 401, "User id is missing");
    }

    const profile = await getUserProfile(authUserId);

    return sendSuccess(res, 200, "Profile fetched successfully", { profile });
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

const updateProfile = async (req, res) => {
  try {
    const authUserId = req.headers["x-user-id"];

    if (!authUserId) {
      return sendError(res, 401, "User id is missing");
    }

    const { phone, education, skills, experience, preferences, profileImage } = req.body;

    const profile = await updateUserProfile(authUserId, {
      phone,
      education,
      skills,
      experience,
      preferences,
      profileImage
    });

    return sendSuccess(res, 200, "Profile updated successfully", { profile });
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

export { getProfile, updateProfile };
