const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  mdp: { type: String, required: true, unique: true, lowercase: true },
  adresse: { type: String, required: true, unique: true, lowercase: true },
  statut: { type: String, required: true, unique: true, lowercase: true },
  role: { type: String, required: true, unique: true, lowercase: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
