import {
  uploadResume,
  getUserResumes,
  getResumeById,
  deleteResume,
  analyzeUserResume,
  getUserResumeAtsScore,
  compareUserResumeWithJd,
  improveUserResume
} from "../services/resume.service.js";
import { sendSuccess, sendError } from "../utils/apiResponse.js";

const upload = async (req, res) => {
  try {
    const authUserId = req.headers["x-user-id"];

    if (!authUserId) {
      return sendError(res, 401, "User id is missing");
    }

    if (!req.file) {
      return sendError(res, 400, "Resume PDF file is required");
    }

    const resume = await uploadResume(authUserId, req.file);

    return sendSuccess(res, 201, "Resume uploaded successfully", { resume });
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

const getAll = async (req, res) => {
  try {
    const authUserId = req.headers["x-user-id"];

    if (!authUserId) {
      return sendError(res, 401, "User id is missing");
    }

    const resumes = await getUserResumes(authUserId);

    return sendSuccess(res, 200, "Resumes fetched successfully", { resumes });
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

const getOne = async (req, res) => {
  try {
    const authUserId = req.headers["x-user-id"];
    const { id } = req.params;

    if (!authUserId) {
      return sendError(res, 401, "User id is missing");
    }

    const resume = await getResumeById(authUserId, id);

    return sendSuccess(res, 200, "Resume fetched successfully", { resume });
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

const remove = async (req, res) => {
  try {
    const authUserId = req.headers["x-user-id"];
    const { id } = req.params;

    if (!authUserId) {
      return sendError(res, 401, "User id is missing");
    }

    await deleteResume(authUserId, id);

    return sendSuccess(res, 200, "Resume deleted successfully");
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

const analyze = async (req, res) => {
  try {
    const authUserId = req.headers["x-user-id"];
    const { id } = req.params;

    if (!authUserId) {
      return sendError(res, 401, "User id is missing");
    }

    const result = await analyzeUserResume(authUserId, id);

    return sendSuccess(res, 200, "Resume analyzed successfully", result);
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

const atsScore = async (req, res) => {
  try {
    const authUserId = req.headers["x-user-id"];
    const { id } = req.params;

    if (!authUserId) {
      return sendError(res, 401, "User id is missing");
    }

    const result = await getUserResumeAtsScore(authUserId, id);

    return sendSuccess(res, 200, "ATS score generated successfully", result);
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

const compareJd = async (req, res) => {
  try {
    const authUserId = req.headers["x-user-id"];
    const { id } = req.params;
    const { jobDescription } = req.body;

    if (!authUserId) {
      return sendError(res, 401, "User id is missing");
    }

    if (!jobDescription) {
      return sendError(res, 400, "Job description is required");
    }

    const result = await compareUserResumeWithJd(authUserId, id, jobDescription);

    return sendSuccess(res, 200, "Resume compared with job description", result);
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

const improve = async (req, res) => {
  try {
    const authUserId = req.headers["x-user-id"];
    const { id } = req.params;

    if (!authUserId) {
      return sendError(res, 401, "User id is missing");
    }

    const result = await improveUserResume(authUserId, id);

    return sendSuccess(res, 200, "Resume improvement generated", result);
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

export { upload, getAll, getOne, remove, analyze, atsScore, compareJd, improve };
