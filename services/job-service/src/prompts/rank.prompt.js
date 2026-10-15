const getJobRankPrompt = (userSkills, jobs) => {
  return `
You are a job ranking assistant.

Rank the jobs from most relevant to least relevant.
Return a simple JSON array with:
- jobId
- rank
- reason

User skills: ${userSkills}

Jobs:
${JSON.stringify(jobs)}
`;
};

export default getJobRankPrompt;
