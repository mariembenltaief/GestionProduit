const mongoose = require("mongoose");

const categorieSchema = new mongoose.Schema({
  nomCategorie: { type: String, required: true, trim: true },
  descriptionCategorie: { type: String },
  typeCategorie: { type: String },
  imageCategorie: { type: String },
});

module.exports = mongoose.model("Categorie", categorieSchema);
