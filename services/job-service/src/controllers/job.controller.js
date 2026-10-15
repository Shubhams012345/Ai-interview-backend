import {searchJobs,createJob,saveJob,getSavedJobs,applyToJob,getAppliedJobs,getJobRecommendations,
  getSkillGapAnalysis,
  getRankedJobs
} from "../services/job.service.js";
import { sendSuccess, sendError } from "../utils/apiResponse.js";

const search = async (req, res) => {
  try {
    const { title, location, skills } = req.query;
    const jobs = await searchJobs({ title, location, skills });

    return sendSuccess(res, 200, "Jobs fetched successfully", { jobs });
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

const create = async (req, res) => {
  try {
    const { title, company, location, description, skills, experienceLevel, jobType } = req.body;

    if (!title || !company || !description) {
      return sendError(res, 400, "Title, company and description are required");
    }

    const job = await createJob({
      title,
      company,
      location,
      description,
      skills,
      experienceLevel,
      jobType
    });

    return sendSuccess(res, 201, "Job created successfully", { job });
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

const save = async (req, res) => {
  try {
    const authUserId = req.headers["x-user-id"];
    const { jobId } = req.body;

    if (!authUserId) {
      return sendError(res, 401, "User id is missing");
    }

    if (!jobId) {
      return sendError(res, 400, "Job id is required");
    }

    const savedJob = await saveJob(authUserId, jobId);

    return sendSuccess(res, 201, "Job saved successfully", { savedJob });
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

const saved = async (req, res) => {
  try {
    const authUserId = req.headers["x-user-id"];

    if (!authUserId) {
      return sendError(res, 401, "User id is missing");
    }

    const savedJobs = await getSavedJobs(authUserId);

    return sendSuccess(res, 200, "Saved jobs fetched successfully", { savedJobs });
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

const apply = async (req, res) => {
  try {
    const authUserId = req.headers["x-user-id"];
    const { jobId } = req.body;

    if (!authUserId) {
      return sendError(res, 401, "User id is missing");
    }

    if (!jobId) {
      return sendError(res, 400, "Job id is required");
    }

    const appliedJob = await applyToJob(authUserId, jobId);

    return sendSuccess(res, 201, "Job application saved", { appliedJob });
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

const applied = async (req, res) => {
  try {
    const authUserId = req.headers["x-user-id"];

    if (!authUserId) {
      return sendError(res, 401, "User id is missing");
    }

    const appliedJobs = await getAppliedJobs(authUserId);

    return sendSuccess(res, 200, "Applied jobs fetched successfully", { appliedJobs });
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

const recommend = async (req, res) => {
  try {
    const { skills, experience } = req.body;

    if (!skills) {
      return sendError(res, 400, "Skills are required");
    }

    const recommendations = await getJobRecommendations({ skills, experience });

    return sendSuccess(res, 200, "Job recommendations generated", { recommendations });
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

const skillGap = async (req, res) => {
  try {
    const { skills, jobDescription } = req.body;

    if (!skills || !jobDescription) {
      return sendError(res, 400, "Skills and job description are required");
    }

    const analysis = await getSkillGapAnalysis({ skills, jobDescription });

    return sendSuccess(res, 200, "Skill gap analysis generated", { analysis });
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

const rank = async (req, res) => {
  try {
    const { skills } = req.body;

    if (!skills) {
      return sendError(res, 400, "Skills are required");
    }

    const rankedJobs = await getRankedJobs({ skills });

    return sendSuccess(res, 200, "Jobs ranked successfully", { rankedJobs });
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

export { search, create, save, saved, apply, applied, recommend, skillGap, rank };
