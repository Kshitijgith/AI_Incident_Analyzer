const { searchSimilarChunks } = require("./retriever");

const testCases = [
    {
        name: "REAL INCIDENT - Google OAuth",
        query: `
        Google OAuth token exchange failed with a 400 error.
        Users are unable to login using Google authentication.
        `
    },
    {
        name: "REAL INCIDENT - MongoDB",
        query: `
        MongoDB connection timeout while processing a request.
        The database connection failed.
        `
    },
    {
        name: "UNRELATED - Chinese text",
        query: `
        繁体字
        `
    }
];

async function runTests() {

    for (const testCase of testCases) {

        console.log("\n\n======================================");
        console.log(testCase.name);
        console.log("======================================");

        console.log("Query:", testCase.query.trim());

        const results = await searchSimilarChunks(testCase.query);

        console.log("\nResults:", results.length);

        for (const result of results) {

            console.log("\n------------------------------");

            console.log("Score:", result.score);

            console.log("File:", result.payload?.file);

            console.log(
                "Chunk:",
                result.payload?.chunkIndex
            );

            console.log(
                "Content:",
                result.payload?.content?.slice(0, 300)
            );
        }
    }
}

runTests();