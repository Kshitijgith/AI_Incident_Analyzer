const fs = require("fs");
const path = require("path");

const { readFile } = require("./reader");
const { chunkText } = require("./chunker");

const repoPath = path.join(__dirname, "/repos/project");

const ignoredDirectories = [
    "node_modules",
    ".git",
    ".next",
    "dist",
    "build",
    "coverage"
];

const ignoredFiles = [
    ".env",
    ".env.local",
    ".env.production",
    "package-lock.json"
];

const allowedExtensions = [
    ".js",
    ".ts",
    ".jsx",
    ".tsx",
    ".json",
    ".java",
    ".go",
    ".py"
];

function getLanguage(filePath) {
    const extension = path.extname(filePath);

    const languages = {
        ".js": "javascript",
        ".ts": "typescript",
        ".jsx": "javascript",
        ".tsx": "typescript",
        ".java": "java",
        ".go": "go",
        ".py": "python",
        ".json": "json"
    };

    return languages[extension] || "unknown";
}

function scanDirectory(directory) {
    const files = fs.readdirSync(directory);

    let results = [];

    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {

            if (ignoredDirectories.includes(file)) {
                continue;
            }

            results = results.concat(scanDirectory(fullPath));

        } else {

            const extension = path.extname(file);

            if (
                allowedExtensions.includes(extension) &&
                !ignoredFiles.includes(file)
            ) {
                results.push(fullPath);
            }
        }
    }

    return results;
}

function getAllChunks() {
    const files = scanDirectory(repoPath);

    let allChunks = [];

    for (const file of files) {
        const content = readFile(file);

        const chunks = chunkText(content, {
            file: file,
            language: getLanguage(file)
        });

        allChunks = allChunks.concat(chunks);
    }

    return allChunks;
}

module.exports = {
    getAllChunks
};