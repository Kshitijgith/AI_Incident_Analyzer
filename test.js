const { analyzeChunk,analyzeIncident } = require("./analyzer");
const { getAllChunks } = require("./scanner");
const { searchChunks } = require("./retriever");

async function main() {
    var incident=`Incident:

Users are unable to log in using Google OAuth.

When the Google OAuth callback is triggered, the backend returns HTTP 500.

Server logs:

AxiosError: Request failed with status code 400
at axios.post(...)
Request URL: https://oauth2.googleapis.com/token

The error started after a deployment.
Other API endpoints are working normally.

Expected behavior:
After Google authentication, the backend should exchange the authorization code for tokens, fetch the user's Google profile, save/update the user in MongoDB, and redirect the user to the dashboard.

Current behavior:
Google login fails and users receive "Authentication failed".`


    const chunks = getAllChunks();
    const results = searchChunks(chunks, incident);

console.log("Total chunks:", chunks.length);
console.log("Relevant chunks:", results.length);

for (const result of results.slice(0, 5)) {
    console.log("\n==============================");
    console.log("FILE:", result.file);
    console.log("LANGUAGE:", result.language);
    console.log("CHUNK:", result.chunkIndex);
    console.log("SCORE:", result.score);
    console.log("==============================");

    console.log(result.content);
//const response=await analyzeIncident(chunks[21],incident)
//console.log(response)



//     console.log("Total chunks:", chunks.length);
// var i=0;
//     for (const chunk of chunks) {
//         console.log(i)
//         i++;
//         console.log("\n==============================");
//         console.log("Analyzing:", chunk.file);
//         console.log("Chunk:", chunk.chunkIndex);
//         console.log("content",chunk.content)
//         console.log("==============================");

        
//     }
}
}

main();