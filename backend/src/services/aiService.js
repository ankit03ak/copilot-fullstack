const axios = require("axios");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-1.5-flash";

async function generateCodeFromAI(prompt, language) {
  if (!GEMINI_API_KEY) {
    const err = new Error("GEMINI_API_KEY is not configured");
    err.status = 500;
    throw err;
  }

  const systemMessage = `
You are a code generation assistant. Generate ONLY ${language} code in your answer.
No explanation, no markdown formatting - only pure code output.
`;

  const userMessage = `Prompt: ${prompt}\nLanguage: ${language}`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  try {
    const response = await axios.post(url, {
      contents: [
        {
          role: "user",
          parts: [
            { text: systemMessage },
            { text: userMessage }
          ]
        }
      ]
    });

    const content = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return content.trim();
  } catch (err) {
    console.error("Gemini error:", err.response?.data || err.message);
    err.status = err.response?.status || 500;
    throw err;
  }
}

module.exports = { generateCodeFromAI };
