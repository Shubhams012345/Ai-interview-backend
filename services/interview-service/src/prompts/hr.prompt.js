const getHrStartPrompt = (jobRole, experienceLevel) => {
  return `
You are an HR interviewer for a ${jobRole} role.
The candidate experience level is ${experienceLevel}.
Ask only one behavioral or HR question to start the interview.
`;
};

const getHrNextQuestionPrompt = (jobRole, experienceLevel, conversation) => {
  return `
You are an HR interviewer for a ${jobRole} role.
The candidate experience level is ${experienceLevel}.
Ask the next HR question based on the conversation so far.
Ask only one question.

Conversation:
${JSON.stringify(conversation)}
`;
};

export { getHrStartPrompt, getHrNextQuestionPrompt };
