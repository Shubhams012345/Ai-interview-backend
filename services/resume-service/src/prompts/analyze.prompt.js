const getResumeAnalyzePrompt = (resumeText) => {
  return `
You are a resume analysis assistant.

Analyze the resume text below and return a simple JSON object with:
- summary
- skills
- strengths
- weaknesses
- suggestedRoles

Resume:
${resumeText}
`;
};

export default getResumeAnalyzePrompt;
