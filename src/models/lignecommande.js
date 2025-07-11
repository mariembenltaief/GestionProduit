const mongoose = require("mongoose");

const ligneCommandeSchema = new mongoose.Schema({
  produit: { type: mongoose.Schema.Types.ObjectId, ref: "Produit", required: true },
  quantite: { type: Number, required: true },
  prixUnitaire: { type: Number, required: true }
});

ligneCommandeSchema.methods.calculerSousTotal = function() {
  return this.quantite * this.prixUnitaire;
};

module.exports = mongoose.model("LigneCommande", ligneCommandeSchema);
