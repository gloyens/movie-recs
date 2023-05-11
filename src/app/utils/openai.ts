import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const makeRequest = async (
  system: string,
  user: string,
  temperature = 0.5
) => {
  if (!configuration.apiKey) {
    throw new Error(
      "OpenAI API key not configured, please follow instructions in README.md"
    );
  }

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: system,
      },
      {
        role: "user",
        content: user,
      },
    ],
    temperature,
  });

  const description = completion.data.choices[0].message?.content;

  if (!description) {
    throw new Error("No response from OpenAI");
  }

  return description;
};

export default openai;
