const getAtsScorePrompt = (resumeText) => {
  return `
You are an ATS scoring assistant.

Give an ATS score from 0 to 100 for the resume below.
Return a simple JSON object with:
- score
- missingKeywords
- formattingIssues
- improvementTips

Resume:
${resumeText}
`;
};

export default getAtsScorePrompt;
