const getJobRecommendPrompt = (userSkills, userExperience, jobs) => {
  return `
You are a job recommendation assistant.

Recommend the most suitable jobs from the list.
Return a simple JSON array with:
- jobId
- reason

User skills: ${userSkills}
User experience: ${userExperience}

Jobs:
${JSON.stringify(jobs)}
`;
};

export default getJobRecommendPrompt;
