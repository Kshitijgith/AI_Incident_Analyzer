
require("dotenv").config();


console.log(process.env.GEMINI_API_KEY);
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function Call() {
    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: "Explain what a Node.js event loop is in simple terms."
    });

    console.log(response.text);
}

Call();