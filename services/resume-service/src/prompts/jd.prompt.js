const getResumeVsJdPrompt = (resumeText, jobDescription) => {
  return `
You are a resume matching assistant.

Compare the resume with the job description.
Return a simple JSON object with:
- matchScore
- matchingSkills
- missingSkills
- overallFit

Resume:
${resumeText}

Job Description:
${jobDescription}
`;
};

export default getResumeVsJdPrompt;
