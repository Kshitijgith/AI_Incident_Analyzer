const { randomUUID } = require("crypto");

const { getAllChunks } = require("./scanner");
const { createEmbedding } = require("./embedder");

const {
    client,
    COLLECTION_NAME
} = require("./vectorstore");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function indexRepository() {

    const chunks = getAllChunks();

    console.log("Total chunks:", chunks.length);

    for (const chunk of chunks) {

        console.log(
            `Indexing: ${chunk.file} | Chunk: ${chunk.chunkIndex}`
        );

        // 1. Convert code into embedding
        const vector = await createEmbedding(chunk.content);

        // 2. Create unique point ID
        const pointId = randomUUID();

        // 3. Store in Qdrant
        await client.upsert(COLLECTION_NAME, {
            wait: true,
            points: [
                {
                    id: pointId,

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
    }

    console.log("Repository indexing completed!");
    await sleep(2000)
}

indexRepository();