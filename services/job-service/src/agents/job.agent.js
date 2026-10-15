import { generateAiResponse } from "../services/llm.service.js";
import getJobRecommendPrompt from "../prompts/recommend.prompt.js";
import getSkillGapPrompt from "../prompts/skillGap.prompt.js";
import getJobRankPrompt from "../prompts/rank.prompt.js";

const recommendJobs = async (userSkills, userExperience, jobs) => {
  const prompt = getJobRecommendPrompt(userSkills, userExperience, jobs);
  return generateAiResponse(prompt);
};

const analyzeSkillGap = async (userSkills, jobDescription) => {
  const prompt = getSkillGapPrompt(userSkills, jobDescription);
  return generateAiResponse(prompt);
};

const rankJobs = async (userSkills, jobs) => {
  const prompt = getJobRankPrompt(userSkills, jobs);
  return generateAiResponse(prompt);
};

export { recommendJobs, analyzeSkillGap, rankJobs };
