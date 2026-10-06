const {
    getInstallations,
    createInstallationToken,
    getInstallationRepositories
} = require("./githubApp");

async function main() {

    console.log("Getting GitHub App installations...");

    const installations = await getInstallations();

    console.log(
        installations.map(installation => ({
            id: installation.id,
            account: installation.account.login
        }))
    );

    if (installations.length === 0) {
        console.log("No installation found.");
        console.log("Install the GitHub App on your GitHub account first.");
        return;
    }

    const installationId = installations[0].id;

    console.log("Installation ID:", installationId);

    const tokenData =
        await createInstallationToken(installationId);

    console.log("Installation token created!");

    const repositories =
        await getInstallationRepositories(
            tokenData.token
        );

    console.log(
        repositories.repositories.map(repo => ({
            id: repo.id,
            name: repo.name,
            fullName: repo.full_name,
            private: repo.private
        }))
    );
}

main().catch(error => {
    console.error(
        error.response?.data || error.message
    );
});