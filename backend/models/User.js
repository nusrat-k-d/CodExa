const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  date: String,
  easy: Number,
  medium: Number,
  hard: Number,
  total: Number,
});

const userSchema = new mongoose.Schema({
  username: String,
  history: [progressSchema],
});

module.exports = mongoose.model("User", userSchema);