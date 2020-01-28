const express = require("express");
const app = express();
require("dotenv").config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);

const Note = require("./models/note");

app.use(express.static("build"));

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes.map(note => note.toJSON()));
  });
});

app.get("/api/notes/:id", (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note.toJSON());
  });
});

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (body.content === undefined) {
    return response.status(400).json({
      error: "content missing"
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date()
  });

  note.save().then(savedNote => {
    response.json(savedNote.toJSON());
  });
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter(note => note.id !== id);

  response.status(204).end();
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
