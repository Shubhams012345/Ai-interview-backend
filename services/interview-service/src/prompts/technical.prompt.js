const getTechnicalStartPrompt = (jobRole, experienceLevel) => {
  return `
You are a technical interviewer for a ${jobRole} role.
The candidate experience level is ${experienceLevel}.
Ask only one clear technical question to start the interview.
`;
};

const getTechnicalNextQuestionPrompt = (jobRole, experienceLevel, conversation) => {
  return `
You are a technical interviewer for a ${jobRole} role.
The candidate experience level is ${experienceLevel}.
Ask the next technical question based on the conversation so far.
Ask only one question.

Conversation:
${JSON.stringify(conversation)}
`;
};

export { getTechnicalStartPrompt, getTechnicalNextQuestionPrompt };
