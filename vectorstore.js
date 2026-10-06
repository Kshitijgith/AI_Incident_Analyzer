const { QdrantClient } = require("@qdrant/js-client-rest");

const client = new QdrantClient({
    url: "http://localhost:6333"
});

const COLLECTION_NAME = "code_chunks";

async function createCollection() {
    const collections = await client.getCollections();

    const exists = collections.collections.some(
        collection => collection.name === COLLECTION_NAME
    );

    if (exists) {
        console.log("Collection already exists");
        return;
    }

    await client.createCollection(COLLECTION_NAME, {
        vectors: {
            size: 3072,
            distance: "Cosine"
        }
    });

    console.log("Collection created!");
}

//createCollection()

module.exports = {
    client,
    COLLECTION_NAME,
    createCollection
};