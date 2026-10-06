 const {simpleGit} = require("simple-git");

async function cloneRepo(repoUrl) {
    const git = simpleGit();

    await git.clone(
        repoUrl,
        "./repos/project"
    );

    console.log("Repository cloned!");
}

cloneRepo('https://github.com/Kshitijgith/URL-Shortner.git');