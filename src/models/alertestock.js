const mongoose = require("mongoose");

const alerteStockSchema = new mongoose.Schema({
  idProduit: { type: mongoose.Schema.Types.ObjectId, ref: "Produit", required: true },
  seuilMinimum: { type: Number, required: true },
  dateAlerte: { type: Date, default: Date.now },
  statutAlerte: { type: String, enum: ['active', 'résolue'], default: 'active' }
});

alerteStockSchema.methods.declencherAlerte = function() {
  this.statutAlerte = 'active';
  this.dateAlerte = new Date();
  return this.save();
};

alerteStockSchema.methods.resoudreAlerte = function() {
  this.statutAlerte = 'résolue';
  return this.save();
};

module.exports = mongoose.model("AlerteStock", alerteStockSchema);
