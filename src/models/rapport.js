const mongoose = require("mongoose");

const rapportSchema = new mongoose.Schema({
  typeRapport: String,
  dateGeneration: { type: Date, default: Date.now },
  periode: String,
  contenuPDF: String // chemin ou URL du PDF
});

rapportSchema.methods.genererRapport = function() {
  // Méthode pour générer rapport (simulation)
  return `Rapport ${this.typeRapport} généré pour la période ${this.periode}`;
};

module.exports = mongoose.model("Rapport", rapportSchema);
