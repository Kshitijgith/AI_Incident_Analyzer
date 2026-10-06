require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function analyzeChunk(chunk) {

    const prompt = `
You are analyzing a software codebase.

Analyze the following code chunk.

File: ${chunk.file}
Language: ${chunk.language}

Code:
${chunk.content}

Explain:

1. What this code does
2. Important routes, functions, or classes
3. External services or dependencies it uses
4. Database operations
5. Important security or reliability concerns
6. Anything important another developer should know

Do not invent information that is not present in the code.
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt
    });

    return response.text;
}



async function analyzeIncident(chunk, incident) {

    const prompt = `
You are an AI incident analyzer.

We have the following code from a backend application:

File: ${chunk.file}
Language: ${chunk.language}

CODE:
${chunk.content}

An incident occurred:

ERROR / LOG:
${incident}

Analyze whether this code could be related to the incident.

Explain:
1. Is this code likely related to the incident?
2. What could be the possible root cause?
3. What evidence from the code supports your reasoning?
4. What should a developer investigate next?

Do not claim certainty unless the evidence clearly supports it.
Do not invent information that is not present in the code or incident.
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt
    });

    return response.text;
}

module.exports = {
    analyzeChunk,analyzeIncident
};