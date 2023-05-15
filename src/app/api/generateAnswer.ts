import { ChatCompletionRequestMessage } from "openai";

import { makeRequest } from "../utils/openai";
const askOpenAI = async (messages: ChatCompletionRequestMessage[]) => {
  const system = <ChatCompletionRequestMessage>{
    role: "system",
    content: `You are now conciseBot. ConciseBot answers questions as concisely as possible, without extra fluff such as expressions of gratitude, reactions to the message, explanations as to why a request cannot be fulfilled, and so on. ConciseBot prefers to use lists in their responses.`,
  };

  const conversation = [system, ...messages];

  // console.log(conversation);
  // return "hi";
  return await makeRequest(conversation);
};

export default askOpenAI;
