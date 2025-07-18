const mongoose = require("mongoose");

const livraisonSchema = new mongoose.Schema({
  dateExpedition: Date,
  dateLivraisonPrevue: Date,
  dateLivraisonEffective: Date,
  statutLivraison: { type: String, enum: ['en transit', 'livrée', 'en attente'], default: 'en attente' },
  notesLivreur: { type :String},
  signatureClient:{ type :String}, // URL ou base64
  
  client:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
});

livraisonSchema.methods.suivreStatut = function() {
  return this.statutLivraison;
};

livraisonSchema.methods.confirmerLivraison = function() {
  this.statutLivraison = 'livrée';
  this.dateLivraisonEffective = new Date();
  return this.save();
};

module.exports = mongoose.model("Livraison", livraisonSchema);
