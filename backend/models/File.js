const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: String,
  path: String,
  size: Number,
  folder: { type: mongoose.Schema.Types.ObjectId, ref: "Folder" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("File", fileSchema);