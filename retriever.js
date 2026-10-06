// function searchChunks(chunks, query) {
//     const words = query
//         .toLowerCase()
//         .split(/\s+/)
//         .filter(word => word.length > 2);

//     const results = [];

//     for (const chunk of chunks) {
//         const content = chunk.content.toLowerCase();

//         let score = 0;

//         for (const word of words) {
//             if (content.includes(word)) {
//                 score++;
//             }
//         }

//         if (score > 0) {
//             results.push({
//                 ...chunk,
//                 score
//             });
//         }
//     }

//     results.sort((a, b) => b.score - a.score);

//     return results;
// }

// module.exports = {
//     searchChunks
// };


const { createEmbedding } = require("./embedder");

const {
    client,
    COLLECTION_NAME
} = require("./vectorstore");

async function searchSimilarChunks(query) {

    const queryVector = await createEmbedding(query);
   // console.log("Query vector length:", queryVector.length);
//console.log("First 10 values:", queryVector.slice(0, 10));

    const response = await client.query(COLLECTION_NAME, {
    query: queryVector,
    limit: 30,
    with_payload: true,
    with_vector: true
});

const results = response.points.filter(
    point => point.score >= 0.65
);



// console.log("ID:", point.id);
// console.log("Score:", point.score);
// console.log("File:", point.payload?.file);
// console.log("Stored vector length:", point.vector?.length);
// console.log("Query vector length:", queryVector.length);

    return results;
}

const incident = `Users can successfully log in using Google OAuth, but after authentication
they remain on the login page instead of being redirected to the home page.

Browser console:
Authentication successful

Network:
GET /auth/google/callback → 200 OK

Backend logs:
User authenticated successfully.
User information saved successfully.

However, the React application does not navigate to the expected page.

Expected behavior:
After successful Google authentication, the user should be redirected
to the application home page and see their authenticated session.`;

//const incident = `Hi`;
async function main() {

    const results = await searchSimilarChunks(incident);
// console.log(typeof(results))

     console.log("Relevant chunks:", results.length);

    for (const result of results) {

        console.log("\n==============================");
            console.log(result.id)
        console.log("Score:", result.score);
        console.log("File:", result.payload.file);
        console.log("Chunk:", result.payload.chunkIndex);

        console.log("==============================");

        console.log(result.payload.content);
    }
}
main()


module.exports = {
    searchSimilarChunks
};