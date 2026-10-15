const getEvaluateAnswerPrompt = (question, answer) => {
  return `
You are an interview evaluator.
Evaluate this answer in 2 to 3 short sentences.

Question: ${question}
Answer: ${answer}
`;
};

const getFinalFeedbackPrompt = (jobRole, interviewType, conversation) => {
  return `
You are an interview feedback assistant.

Give final feedback for this ${interviewType} interview for a ${jobRole} role.
Return a simple JSON object with:
- score (0 to 100)
- strengths
- improvements
- finalComment

Conversation:
${JSON.stringify(conversation)}
`;
};

export { getEvaluateAnswerPrompt, getFinalFeedbackPrompt };
