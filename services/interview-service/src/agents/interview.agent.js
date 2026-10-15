import { generateAiResponse } from "../services/llm.service.js";
import { getTechnicalStartPrompt, getTechnicalNextQuestionPrompt } from "../prompts/technical.prompt.js";
import { getHrStartPrompt, getHrNextQuestionPrompt } from "../prompts/hr.prompt.js";
import { getCodingStartPrompt, getCodingNextQuestionPrompt } from "../prompts/coding.prompt.js";
import { getEvaluateAnswerPrompt, getFinalFeedbackPrompt } from "../prompts/feedback.prompt.js";

const getStartPrompt = (interviewType, jobRole, experienceLevel) => {
  if (interviewType === "hr") {
    return getHrStartPrompt(jobRole, experienceLevel);
  }

  if (interviewType === "coding") {
    return getCodingStartPrompt(jobRole, experienceLevel);
  }

  return getTechnicalStartPrompt(jobRole, experienceLevel);
};

const getNextQuestionPrompt = (interviewType, jobRole, experienceLevel, conversation) => {
  if (interviewType === "hr") {
    return getHrNextQuestionPrompt(jobRole, experienceLevel, conversation);
  }

  if (interviewType === "coding") {
    return getCodingNextQuestionPrompt(jobRole, experienceLevel, conversation);
  }

  return getTechnicalNextQuestionPrompt(jobRole, experienceLevel, conversation);
};

const startInterview = async (interviewType, jobRole, experienceLevel) => {
  const prompt = getStartPrompt(interviewType, jobRole, experienceLevel);
  return generateAiResponse(prompt);
};

const askNextQuestion = async (interviewType, jobRole, experienceLevel, conversation) => {
  const prompt = getNextQuestionPrompt(interviewType, jobRole, experienceLevel, conversation);
  return generateAiResponse(prompt);
};

const evaluateAnswer = async (question, answer) => {
  const prompt = getEvaluateAnswerPrompt(question, answer);
  return generateAiResponse(prompt);
};

const generateFinalFeedback = async (jobRole, interviewType, conversation) => {
  const prompt = getFinalFeedbackPrompt(jobRole, interviewType, conversation);
  return generateAiResponse(prompt);
};

export { startInterview, askNextQuestion, evaluateAnswer, generateFinalFeedback };
