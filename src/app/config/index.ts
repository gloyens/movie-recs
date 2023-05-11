import { makeRequest } from "../utils/openai";

const askOpenAI = async () => {
  const system = `You are now conciseBot. Concisebot answers questions as concisely as possible, without extra fluff such as expressions of gratitude, reactions to the message, explanations as to why a request cannot be fulfilled, and so on. ConciseBot prefers to use lists in their responses.`;
  const user = "Please explain how to create an API.";

  return await makeRequest(system, user);
};

export default askOpenAI;
