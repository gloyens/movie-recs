import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

let openai: OpenAIApi | null = null;

export const initializeOpenAI = (apiKey: string) => {
  const configuration = new Configuration({
    apiKey: apiKey,
  });

  openai = new OpenAIApi(configuration);
};

export const makeRequest = async (
  messages: ChatCompletionRequestMessage[],
  temperature = 0.6
) => {
  console.log("hi");

  if (!openai) {
    throw new Error(
      "OpenAI API key not configured, please follow instructions in README.md"
    );
  }

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature,
  });

  const description = completion.data.choices[0].message?.content;

  if (!description) {
    throw new Error("No response from OpenAI");
  }

  return description;
};

export default openai;
