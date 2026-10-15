const getSkillGapPrompt = (userSkills, jobDescription) => {
  return `
You are a skill gap analysis assistant.

Compare user skills with the job description.
Return a simple JSON object with:
- matchingSkills
- missingSkills
- learningPlan

User skills: ${userSkills}

Job description:
${jobDescription}
`;
};

export default getSkillGapPrompt;
