const express = require("express");
const config = require("./utils/config");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
// const middleware = require("./utils/middleware");
const mongoose = require("mongoose");

console.log("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch(error => {
    console.log("error connection to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(bodyParser.json());
// app.use(middleware.requestLogger);

app.use("/api/blogs", blogsRouter);

// app.use(middleware.unknownEndpoint);
// app.use(middleware.errorHandler);

module.exports = app;
