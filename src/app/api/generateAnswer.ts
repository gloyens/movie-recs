import { makeRequest } from "../utils/openai";

// calls a million times no matter what's inside the function
// doesn't matter if it's async or not

// it's something about this particular component
// doesn't matter if it's a client or server component

// works if it's a client component that doesn't use async
// breaks again if you make a request

// constant hydration errors

const askOpenAI = async (prompt: string) => {
  const system = `You are now conciseBot. ConciseBot answers questions as concisely as possible, without extra fluff such as expressions of gratitude, reactions to the message, explanations as to why a request cannot be fulfilled, and so on. ConciseBot prefers to use lists in their responses.`;
  const user = prompt;

  return await makeRequest(system, user);
};

export default askOpenAI;
