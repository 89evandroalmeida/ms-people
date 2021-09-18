const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personSchema = Schema({
  code: { type: String, required: true, index: true },
  email: { type: String, required: true, index: true },
  name: { type: String, required: true },
  personalData: [
    { cpf: { type: String } }
  ],
  sensitiveData: [
    { ethnicity: { type: String } }
  ]
});

module.exports = Person = mongoose.model("person", personSchema);
