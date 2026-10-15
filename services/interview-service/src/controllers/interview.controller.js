import {createInterviewSession,continueInterviewSession,endInterviewSession,getUserInterviews, getInterviewById
} from "../services/interview.service.js";
import { sendSuccess, sendError } from "../utils/apiResponse.js";

const start = async (req, res) => {
  try {
    const authUserId = req.headers["x-user-id"];
    const { interviewType, jobRole, experienceLevel } = req.body;

    if (!authUserId) {
      return sendError(res, 401, "User id is missing");
    }

    if (!interviewType || !jobRole || !experienceLevel) {
      return sendError(res, 400, "Interview type, job role and experience level are required");
    }

    const session = await createInterviewSession({
      authUserId,
      interviewType,
      jobRole,
      experienceLevel
    });

    return sendSuccess(res, 201, "Interview started", { session });
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

const continueInterview = async (req, res) => {
  try {
    const authUserId = req.headers["x-user-id"];
    const { id } = req.params;
    const { answer } = req.body;

    if (!authUserId) {
      return sendError(res, 401, "User id is missing");
    }

    if (!answer) {
      return sendError(res, 400, "Answer is required");
    }

    const result = await continueInterviewSession({
      authUserId,
      sessionId: id,
      answer
    });

    return sendSuccess(res, 200, "Answer recorded", result);
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

const end = async (req, res) => {
  try {
    const authUserId = req.headers["x-user-id"];
    const { id } = req.params;

    if (!authUserId) {
      return sendError(res, 401, "User id is missing");
    }

    const session = await endInterviewSession({
      authUserId,
      sessionId: id
    });

    return sendSuccess(res, 200, "Interview ended", { session });
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

    const interviews = await getUserInterviews(authUserId);

    return sendSuccess(res, 200, "Interview history fetched", { interviews });
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

    const session = await getInterviewById(authUserId, id);

    return sendSuccess(res, 200, "Interview fetched", { session });
  } catch (error) {
    return sendError(res, error.statusCode || 500, error.message);
  }
};

export { start, continueInterview, end, getAll, getOne };
