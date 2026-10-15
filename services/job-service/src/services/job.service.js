import Job from "../models/job.model.js";
import SavedJob from "../models/savedJob.model.js";
import AppliedJob from "../models/appliedJob.model.js";
import ApiError from "../utils/apiError.js";
import redisClient from "../config/redis.js";
import { recommendJobs, analyzeSkillGap, rankJobs } from "../agents/job.agent.js";

const searchJobs = async ({ title, location, skills }) => {
  const cacheKey = `jobs:${title || ""}:${location || ""}:${skills || ""}`;
  const cachedJobs = await redisClient.get(cacheKey);

  if (cachedJobs) {
    return JSON.parse(cachedJobs);
  }

  const filter = {};

  if (title) {
    filter.title = { $regex: title, $options: "i" };
  }

  if (location) {
    filter.location = { $regex: location, $options: "i" };
  }

  if (skills) {
    const skillList = skills.split(",").map((skill) => skill.trim());
    filter.skills = { $in: skillList };
  }

  const jobs = await Job.find(filter).sort({ createdAt: -1 });

  await redisClient.set(cacheKey, JSON.stringify(jobs), "EX", 120);

  return jobs;
};

const createJob = async (jobData) => {
  const job = await Job.create(jobData);
  return job;
};

const saveJob = async (authUserId, jobId) => {
  const job = await Job.findById(jobId);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  const savedJob = await SavedJob.findOneAndUpdate(
    { authUserId, jobId },
    { authUserId, jobId },
    { new: true, upsert: true }
  );

  return savedJob.populate("jobId");
};

const getSavedJobs = async (authUserId) => {
  return SavedJob.find({ authUserId }).populate("jobId").sort({ createdAt: -1 });
};

const applyToJob = async (authUserId, jobId) => {
  const job = await Job.findById(jobId);

  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  const appliedJob = await AppliedJob.findOneAndUpdate(
    { authUserId, jobId },
    { authUserId, jobId, status: "Applied" },
    { new: true, upsert: true }
  );

  return appliedJob.populate("jobId");
};

const getAppliedJobs = async (authUserId) => {
  return AppliedJob.find({ authUserId }).populate("jobId").sort({ createdAt: -1 });
};

const getJobRecommendations = async ({ skills, experience }) => {
  const jobs = await Job.find().limit(20);
  const result = await recommendJobs(skills, experience, jobs);

  return result;
};

const getSkillGapAnalysis = async ({ skills, jobDescription }) => {
  return analyzeSkillGap(skills, jobDescription);
};

const getRankedJobs = async ({ skills }) => {
  const jobs = await Job.find().limit(20);
  return rankJobs(skills, jobs);
};

export {
  searchJobs,
  createJob,
  saveJob,
  getSavedJobs,
  applyToJob,
  getAppliedJobs,
  getJobRecommendations,
  getSkillGapAnalysis,
  getRankedJobs
};
