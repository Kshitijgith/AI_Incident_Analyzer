const fs = require("fs");

function readFile(filePath) {
    const content = fs.readFileSync(filePath, "utf-8");

    return content;
}

module.exports = {
    readFile
};