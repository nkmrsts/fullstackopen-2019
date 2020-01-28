const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}@cluster0-ap9bx.mongodb.net/note-app?retryWrites=true&w=majority`;

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(function(reason) {
    console.log("Unable to connect to the mongodb instance. Error: ", reason);
  });

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "Browser can execute only Javascript",
  date: new Date(),
  important: false
});

Note.find({ important: true }).then(result => {
  result.forEach(note => {
    console.log(note);
  });
  mongoose.connection.close();
});

// note.save().then(response => {
//   console.log("note saved!");
//   mongoose.connection.close();
// });
