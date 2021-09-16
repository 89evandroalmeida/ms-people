const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String }
});

module.exports = Person = mongoose.model("user", userSchema);