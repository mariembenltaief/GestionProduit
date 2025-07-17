const Commande = require("../models/Commande");

// ✅ Créer une nouvelle commande
exports.createCommande = async (req, res) => {
  try {
    const commande = new Commande(req.body);
    await commande.save();
    res.status(201).json({
      message: "✅ Commande créée avec succès",
      commande,
    });
  } catch (err) {
    res.status(400).json({ message: "❌ Échec de la création de la commande", error: err.message });
  }
};

// 📄 Obtenir toutes les commandes
exports.getAllCommandes = async (req, res) => {
  try {
    const commandes = await Commande.find();
    res.json({
      message: "✅ Liste des commandes récupérée avec succès",
      commandes,
    });
  } catch (err) {
    res.status(500).json({ message: "❌ Erreur lors de la récupération des commandes", error: err.message });
  }
};

// 🔍 Obtenir une commande par ID
exports.getCommandeById = async (req, res) => {
  try {
    const commande = await Commande.findById(req.params.id);
    if (!commande) {
      return res.status(404).json({ message: "❌ Commande non trouvée" });
    }
    res.json({
      message: "✅ Commande trouvée avec succès",
      commande,
    });
  } catch (err) {
    res.status(500).json({ message: "❌ Erreur lors de la recherche de la commande", error: err.message });
  }
};

// ✏️ Mettre à jour une commande
exports.updateCommande = async (req, res) => {
  try {
    const commande = await Commande.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!commande) {
      return res.status(404).json({ message: "❌ Commande à modifier non trouvée" });
    }
    res.json({
      message: "✅ Commande mise à jour avec succès",
      commande,
    });
  } catch (err) {
    res.status(400).json({ message: "❌ Échec de la mise à jour de la commande", error: err.message });
  }
};

// 🗑️ Supprimer une commande
exports.deleteCommande = async (req, res) => {
  try {
    const commande = await Commande.findByIdAndDelete(req.params.id);
    if (!commande) {
      return res.status(404).json({ message: "❌ Commande à supprimer non trouvée" });
    }
    res.json({ message: "✅ Commande supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ message: "❌ Échec de la suppression de la commande", error: err.message });
  }
};
