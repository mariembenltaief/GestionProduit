const mongoose = require("mongoose");

const produitSchema = new mongoose.Schema({
  nom: { type: String, required: true, trim: true },
  description: String,
  prix: { type: Number, required: true },
  quantiteStock: { type: Number, default: 0 },
  typeProduit: String,
  imageURL: String,
  dateAjout: { type: Date, default: Date.now },
  statutProduit: { type: String, enum: ['disponible', 'en rupture', 'archivé'], default: 'disponible' }
});

module.exports = mongoose.model("Produit", produitSchema);
