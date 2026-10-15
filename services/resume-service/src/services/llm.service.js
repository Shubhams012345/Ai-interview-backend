import { GoogleGenerativeAI } from "@google/generative-ai";
import env from "../config/env.js";
import ApiError from "../utils/apiError.js";

const generateAiResponse = async (prompt) => {
  if (!env.geminiApiKey) {
    throw new ApiError(500, "Gemini API key is not configured");
  }

  // All Gemini calls stay in this file so agents only prepare prompts.

  const genAI = new GoogleGenerativeAI(env.geminiApiKey);
  const model = genAI.getGenerativeModel({ model: env.geminiModel });

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  return text;
};

export { generateAiResponse };
