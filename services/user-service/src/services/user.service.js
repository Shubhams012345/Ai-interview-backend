import UserProfile from "../models/userProfile.model.js";
import redisClient from "../config/redis.js";

const PROFILE_CACHE_SECONDS = 300;

const getCacheKey = (authUserId) => `user-profile:${authUserId}`;

const getUserProfile = async (authUserId) => {
  const cacheKey = getCacheKey(authUserId);
  const cachedProfile = await redisClient.get(cacheKey);

  if (cachedProfile) {
    return JSON.parse(cachedProfile);
  }

  let profile = await UserProfile.findOne({ authUserId });

  if (!profile) {
    profile = await UserProfile.create({ authUserId });
  }

  await redisClient.set(cacheKey, JSON.stringify(profile), "EX", PROFILE_CACHE_SECONDS);

  return profile;
};

const updateUserProfile = async (authUserId, profileData) => {
  const updatedProfile = await UserProfile.findOneAndUpdate(
    { authUserId },
    { $set: profileData },
    { new: true, upsert: true }
  );

  await redisClient.del(getCacheKey(authUserId));

  return updatedProfile;
};

export { getUserProfile, updateUserProfile };
