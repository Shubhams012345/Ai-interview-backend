const getResumeImprovePrompt = (resumeText) => {
  return `
You are a resume writing coach.

Improve the resume below and keep it professional.
Return a simple JSON object with:
- improvedSummary
- rewrittenBulletPoints
- extraSuggestions

Resume:
${resumeText}
`;
};

export default getResumeImprovePrompt;
