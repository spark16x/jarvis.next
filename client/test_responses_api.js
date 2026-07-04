import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.NVIDIA_API_KEY || 'placeholder_nvidia_key';
const openai = new OpenAI({
  apiKey,
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

const tools = [
  {
    type: "function",
    name: "getdate",
    description: "Returns current date information",
  }
];

let input = [
  { role: "user", content: "What is today's date?" },
];

async function main() {
  try {
    console.log("Calling openai.responses.create...");
    const response = await openai.responses.create({
      model: "z-ai/glm-5.2",
      tools,
      input,
    });
    console.log("Response output:", response.output);
    console.log("Response text:", response.output_text);
  } catch (err) {
    console.error("Responses API failed:", err.message);
  }
}

main();
