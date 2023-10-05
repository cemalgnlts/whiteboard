import express from "express";

import { Deta } from "deta";
import fileUpload from "express-fileupload";

const PORT = process.env.PORT || 8080;

const deta = Deta();

const base = deta.Base("projects");
const drive = deta.Drive("resources");

const app = express();
app.use(express.json());
app.use(fileUpload());

app.get("/new", async (req, res) => {
  let ret = { status: true };

  try {
    ret.data = await newProject();
  } catch (err) {
    ret.status = false;
    ret.message = err.toString();
  }

  res.send(ret);
});

app.get("/projects", async (req, res) => {
  let ret = { status: true };

  try {
    const data = await base.fetch();
    ret.data = data.items;
  } catch (err) {
    ret.status = false;
    ret.message = err.toString();
  }

  res.send(ret);
});

app.get("/loadSnapshot/:id", async (req, res) => {
  let ret = { status: true };

  try {
    const res = await drive.get(`${req.params.id}/snapshot.json`);
    const arrayBuffer = await res.arrayBuffer();
    ret.data = JSON.parse(Buffer.from(arrayBuffer).toString("utf8"));
  } catch (err) {
    ret.status = false;
    ret.message = err.toString();
  }

  res.send(ret);
});

app.put("/snapshot/:id", async (req, res) => {
  let ret = { status: true };

  try {
    const data = JSON.stringify(req.body);
    await drive.put(`${req.params.id}/snapshot.json`, { data });
  } catch (err) {
    ret.status = false;
    ret.message = err.toString();
  }

  res.send(ret);
});

app.put("/assets/:id/:name", async (req, res) => {
  let ret = { status: true };

  if (!req.files) {
    ret.status = false;
    ret.message = "No files were uploaded.";

    res.send(ret);
    return;
  }

  const file = req.files.file;

  try {
    await drive.put(`/${req.params.id}/${req.params.name}`, {
      data: file.data,
      contentType: file.mimetype,
    });
  } catch (err) {
    console.log(err);
    ret.status = false;
    ret.message = err.toString();
  }

  res.send(ret);
});

app.get("/assets/:id/:name", async (req, res) => {
  let buffer = null;
  let type = null;

  try {
    const blob = await drive.get(`${req.params.id}/${req.params.name}`);
    const arrayBuffer = await blob.arrayBuffer();
    buffer = Buffer.from(arrayBuffer);
    type = blob.type;
  } catch (err) {
    console.error(err);
    res.status(500).send();
    return;
  }
  
  res.type(type);
  res.send(buffer);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

async function newProject() {
  const item = await base.put({
    name: `Project - ${Date.now()}`,
  });

  const key = item.key;

  await drive.put(`${key}/snapshot.json`, {
    data: "{}",
  });

  return { key };
}
