const getCodingStartPrompt = (jobRole, experienceLevel) => {
  return `
You are a coding interviewer for a ${jobRole} role.
The candidate experience level is ${experienceLevel}.
Give one coding problem with input, output, and constraints.
`;
};

const getCodingNextQuestionPrompt = (jobRole, experienceLevel, conversation) => {
  return `
You are a coding interviewer for a ${jobRole} role.
The candidate experience level is ${experienceLevel}.
Ask a follow-up coding question or a small variation based on the conversation.
Ask only one question.

Conversation:
${JSON.stringify(conversation)}
`;
};

export { getCodingStartPrompt, getCodingNextQuestionPrompt };
