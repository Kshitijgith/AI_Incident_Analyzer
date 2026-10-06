require("dotenv").config();

const fs = require("fs");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const privateKey = fs.readFileSync(
    "./github/private-key.pem",
    "utf8"
);

const github = axios.create({
    baseURL: "https://api.github.com",
    headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2026-03-10"
    }
});

function generateAppJWT() {
    const now = Math.floor(Date.now() / 1000);

    return jwt.sign(
        {
            iat: now - 60,
            exp: now + 540,
            iss: process.env.GITHUB_APP_ID
        },
        privateKey,
        {
            algorithm: "RS256"
        }
    );
}

async function getInstallations() {
    const appJWT = generateAppJWT();

    const response = await github.get("/app/installations", {
        headers: {
            Authorization: `Bearer ${appJWT}`
        }
    });

    return response.data;
}

async function createInstallationToken(installationId) {
    const appJWT = generateAppJWT();

    const response = await github.post(
        `/app/installations/${installationId}/access_tokens`,
        {},
        {
            headers: {
                Authorization: `Bearer ${appJWT}`
            }
        }
    );

    return response.data;
}

async function getInstallationRepositories(installationToken) {
    const response = await github.get(
        "/installation/repositories",
        {
            headers: {
                Authorization: `Bearer ${installationToken}`
            }
        }
    );

    return response.data;
}

module.exports = {
    generateAppJWT,
    getInstallations,
    createInstallationToken,
    getInstallationRepositories
};