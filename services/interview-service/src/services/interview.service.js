import InterviewSession from "../models/interviewSession.model.js";
import ApiError from "../utils/apiError.js";
import { startInterview,askNextQuestion, evaluateAnswer, generateFinalFeedback} from "../agents/interview.agent.js";

const createInterviewSession = async ({ authUserId, interviewType, jobRole, experienceLevel }) => {
  const firstQuestion = await startInterview(interviewType, jobRole, experienceLevel);

  const session = await InterviewSession.create({
    authUserId,
    interviewType,
    jobRole,
    experienceLevel,
    conversation: [
      {
        role: "interviewer",
        message: firstQuestion
      }
    ]
  });

  return session;
};

const continueInterviewSession = async ({ authUserId, sessionId, answer }) => {
  const session = await InterviewSession.findOne({ _id: sessionId, authUserId });

  if (!session) {
    throw new ApiError(404, "Interview session not found");
  }

  if (session.status === "completed") {
    throw new ApiError(400, "Interview is already completed");
  }

  const lastQuestion = session.conversation[session.conversation.length - 1];

  session.conversation.push({
    role: "candidate",
    message: answer
  });

  const answerFeedback = await evaluateAnswer(lastQuestion?.message || "", answer);
  const nextQuestion = await askNextQuestion(
    session.interviewType,
    session.jobRole,
    session.experienceLevel,
    session.conversation
  );

  session.conversation.push({
    role: "interviewer",
    message: nextQuestion
  });

  await session.save();

  return {
    session,
    answerFeedback
  };
};

const endInterviewSession = async ({ authUserId, sessionId }) => {
  const session = await InterviewSession.findOne({ _id: sessionId, authUserId });

  if (!session) {
    throw new ApiError(404, "Interview session not found");
  }

  const feedbackText = await generateFinalFeedback(
    session.jobRole,
    session.interviewType,
    session.conversation
  );

  let score = null;

  try {
    const cleanedFeedback = feedbackText.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsedFeedback = JSON.parse(cleanedFeedback);
    score = parsedFeedback.score || null;
  } catch (error) {
    score = null;
  }


  session.feedback = feedbackText;
  session.score = score;
  session.status = "completed";
  await session.save();

  return session;
};

const getUserInterviews = async (authUserId) => {
  return InterviewSession.find({ authUserId }).sort({ createdAt: -1 });
};

const getInterviewById = async (authUserId, sessionId) => {
  const session = await InterviewSession.findOne({ _id: sessionId, authUserId });

  if (!session) {
    throw new ApiError(404, "Interview session not found");
  }

  return session;
};

export {
  createInterviewSession,
  continueInterviewSession,
  endInterviewSession,
  getUserInterviews,
  getInterviewById
};
