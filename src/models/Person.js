const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  }
});

module.exports = Person = mongoose.model("person", personSchema);
