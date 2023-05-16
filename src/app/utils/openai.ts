import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

let openai: OpenAIApi | null = null;
let configuration: Configuration | null = null;

export const initializeOpenAI = (apiKey: string) => {
  configuration = new Configuration({
    apiKey: apiKey,
  });
  apiKey = apiKey;

  openai = new OpenAIApi(configuration);
};

export const makeRequest = async (
  messages: ChatCompletionRequestMessage[],
  apiKey: string,
  temperature = 0.6
) => {

  if (configuration?.apiKey === "") {
    configuration = new Configuration({
      apiKey: apiKey,
    });

    openai = new OpenAIApi(configuration);
  } 
  // else {
  //   throw new Error(
  //   "OpenAI API key not configured, please follow instructions in README.md"
  // ) }


  const completion = await openai?.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature,
  });

  const description = completion?.data.choices[0].message?.content;

  if (!description) {
    throw new Error("No response from OpenAI");
  }

  return description;
};

export default openai;
