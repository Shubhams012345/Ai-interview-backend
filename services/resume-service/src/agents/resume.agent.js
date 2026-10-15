import { generateAiResponse } from "../services/llm.service.js";
import getResumeAnalyzePrompt from "../prompts/analyze.prompt.js";
import getAtsScorePrompt from "../prompts/ats.prompt.js";
import getResumeVsJdPrompt from "../prompts/jd.prompt.js";
import getResumeImprovePrompt from "../prompts/improve.prompt.js";

const analyzeResume = async (resumeText) => {
  const prompt = getResumeAnalyzePrompt(resumeText);
  return generateAiResponse(prompt);
};

const getAtsScore = async (resumeText) => {
  const prompt = getAtsScorePrompt(resumeText);
  return generateAiResponse(prompt);
};

const compareResumeWithJd = async (resumeText, jobDescription) => {
  const prompt = getResumeVsJdPrompt(resumeText, jobDescription);
  return generateAiResponse(prompt);
};

const improveResume = async (resumeText) => {
  const prompt = getResumeImprovePrompt(resumeText);
  return generateAiResponse(prompt);
};

export { analyzeResume, getAtsScore, compareResumeWithJd, improveResume };
