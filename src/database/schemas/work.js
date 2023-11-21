const mongoose = require("mongoose");

const economia = new mongoose.Schema({
  userID: { type: String, required: true, },
  guildID: { type: String, required: true },
  money: { type: Number, default: 100 },
  bank: { type: Number },
});

const model = new mongoose.model("economia", economia);

module.exports = model;

