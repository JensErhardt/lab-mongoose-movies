const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity');

const dbName = 'lab-mongoose-movies';
mongoose.connect(`mongodb://localhost/${dbName}`);

const celebrities = [
  {
    name: "Santa Clause",
    occupation: "unknown",
    catchPhrase: "Hohoho"
  },
  {
    name: "Michael Jackson",
    occupation: "singer",
    catchPhrase: "Beat it"
  },
  {
    name: "2 Pac",
    occupation: "singer",
    catchPhrase: "Fuck the world"
  }
];

Celebrity.deleteMany()
  .then(() => Celebrity.create(celebrities))
  .then(() => {
    console.log("celebrities created.")
    mongoose.connection.close();
  })
  .catch(err => {
    throw err;
  });