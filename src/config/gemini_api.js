// const api_key = "AIzaSyCfPLhHbtUb-Td1XLAPIUETuN9r2vDUjtI";

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

//   const apiKey = process.env.GEMINI_API_KEY;
// const apiKey = String(import.meta.env.GEMINI_API_KEY);
const apiKey = "AIzaSyCfPLhHbtUb-Td1XLAPIUETuN9r2vDUjtI";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  const responseText = result.response.text();
  console.log(result.response.text());

  return responseText;
}

export default run;
