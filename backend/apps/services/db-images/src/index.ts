import express from "express";

const app = express();

app.get("/", (req, res) => {
    // res.send("Hello");
    res.send("Hello from service db-images");
});

app.listen(3000, () => {
    console.log("Server started on port 3000.");
});
