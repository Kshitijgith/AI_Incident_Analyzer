const { createEmbedding } = require("./embedder");
const {
    client,
    COLLECTION_NAME
} = require("./vectorstore");

async function main() {

    const chunk = {
        file: "src/db.js",
        language: "javascript",
        chunkIndex: 0,
        content: `
            mongoose.connect(process.env.MONGO_URI);
        `
    };

    // 1. Create embedding using Gemini
    const vector = await createEmbedding(chunk.content);

    console.log("Embedding created!");
    console.log("Vector length:", vector.length);

    // 2. Store it as a point in Qdrant
    await client.upsert(COLLECTION_NAME, {
        wait: true,
        points: [
            {
                id: 1,
                vector: vector,
                payload: {
                    repoId: "repo_123",
                    file: chunk.file,
                    language: chunk.language,
                    chunkIndex: chunk.chunkIndex,
                    content: chunk.content
                }
            }
        ]
    });

    console.log("Point stored in Qdrant!");
}

main();