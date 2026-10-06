const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("AI Incident Analyzer server is running 🚀");
});

app.post("/webhooks/github", (req, res) => {
    console.log("GitHub webhook received!");

    console.log("Headers:", req.headers);
    console.log("Body:", req.body);

    res.sendStatus(200);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});