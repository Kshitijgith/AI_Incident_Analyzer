const { createEmbedding } = require("./embedder");

// const text = `
// MongoDB connection failed while processing a request.
// The database connection timed out after 5000ms.
// `;

// async function main() {
//     const vector = await createEmbedding(text);

//     console.log("Vector length:", vector.length);
//     console.log("First 10 values:", vector.slice(0, 10));
// }

// main();


const textA = `
MongoDB connection failed while processing a request.
`;

const textB = `
The database connection timed out while handling the request.
`;

const textC = `
Google OAuth authentication failed for the user.
`;

function cosineSimilarity(a, b) {
    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;

    for (let i = 0; i < a.length; i++) {
        dotProduct += a[i] * b[i];
        magnitudeA += a[i] * a[i];
        magnitudeB += b[i] * b[i];
    }

    return dotProduct /
        (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB));
}

async function main() {
    const embeddingA = await createEmbedding(textA);
    const embeddingB = await createEmbedding(textB);
    const embeddingC = await createEmbedding(textC);

    console.log("A vs B:", cosineSimilarity(embeddingA, embeddingB));
    console.log("A vs C:", cosineSimilarity(embeddingA, embeddingC));
}

main();