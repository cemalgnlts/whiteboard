import express from "express";

import { Deta } from "deta";

const PORT = process.env.PORT || 8080;

const app = express();

app.get("/", (req, res) => res.send("Hello"));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
