const mongoose = require("mongoose");

const commandeSchema = new mongoose.Schema({
  numeroCommande: { type: String, unique: true, required: true },
  dateCommande: { type: Date, default: Date.now },
  statutCommande: { 
    type: String, 
    enum: ['en attente', 'confirmée', 'en préparation', 'expédiée', 'livrée', 'annulée'], 
    default: 'en attente' 
  },
  totalCommande: { type: Number, required: true },
  taxesAppliquees: { type: Number, default: 0 },
  adresseLivraison: { type: String, required: true },
  modePaiement: { type: String, required: true },
  datePaiement: Date,
  // Tu peux ajouter la relation à l'utilisateur, ligne commande, etc.
});

commandeSchema.methods.calculerTotal = function() {
  // Ici tu peux faire le calcul (exemple simple)
  return this.totalCommande + this.taxesAppliquees;
};

commandeSchema.methods.changerStatut = function(nouveauStatut) {
  this.statutCommande = nouveauStatut;
  return this.save();
};

commandeSchema.methods.annulerCommande = function() {
  this.statutCommande = 'annulée';
  return this.save();
};

module.exports = mongoose.model("Commande", commandeSchema);
