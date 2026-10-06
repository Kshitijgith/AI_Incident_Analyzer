function chunkText(text, metadata, chunkSize = 3000) {
    const chunks = [];

    for (let i = 0; i < text.length; i += chunkSize) {
        const chunk = {
            file: metadata.file,
            language: metadata.language,
            chunkIndex: chunks.length,
            content: text.slice(i, i + chunkSize)
        };

        chunks.push(chunk);
    }

    return chunks;
}

module.exports = {
    chunkText
};