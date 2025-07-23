const mongoose = require('mongoose');

const venteSchema = new mongoose.Schema({
  produit: { type: String, required: true },          // Nom du produit
  quantite: { type: Number, required: true },         // Quantité vendue
  prixUnitaire: { type: Number, required: true },     // Prix unitaire à la vente
  fournisseur: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Référence fournisseur
  dateVente: { type: String }        // Date de la vente
});

module.exports = mongoose.model('Vente', venteSchema);
