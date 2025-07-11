const LigneCommande = require("../models/LigneCommande");

// ✅ Créer une ligne de commande
exports.createLigneCommande = async (req, res) => {
  try {
    const ligne = new LigneCommande(req.body);
    await ligne.save();
    res.status(201).json({
      message: "✅ Ligne de commande créée avec succès",
      ligne,
    });
  } catch (err) {
    res.status(400).json({ message: "❌ Échec de la création de la ligne", error: err.message });
  }
};

// 📋 Obtenir toutes les lignes de commande
exports.getAllLignes = async (req, res) => {
  try {
    const lignes = await LigneCommande.find().populate("produit");
    res.json({
      message: "✅ Liste des lignes de commande récupérée avec succès",
      lignes,
    });
  } catch (err) {
    res.status(500).json({ message: "❌ Erreur lors de la récupération", error: err.message });
  }
};

// 🔍 Obtenir une ligne de commande par ID
exports.getLigneById = async (req, res) => {
  try {
    const ligne = await LigneCommande.findById(req.params.id).populate("produit");
    if (!ligne) {
      return res.status(404).json({ message: "❌ Ligne de commande non trouvée" });
    }
    res.json({
      message: "✅ Ligne de commande trouvée avec succès",
      ligne,
    });
  } catch (err) {
    res.status(500).json({ message: "❌ Erreur lors de la recherche", error: err.message });
  }
};

// ✏️ Mettre à jour une ligne de commande
exports.updateLigne = async (req, res) => {
  try {
    const ligne = await LigneCommande.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ligne) {
      return res.status(404).json({ message: "❌ Ligne de commande à modifier non trouvée" });
    }
    res.json({
      message: "✅ Ligne de commande mise à jour avec succès",
      ligne,
    });
  } catch (err) {
    res.status(400).json({ message: "❌ Échec de la mise à jour", error: err.message });
  }
};

// 🗑️ Supprimer une ligne de commande
exports.deleteLigne = async (req, res) => {
  try {
    const ligne = await LigneCommande.findByIdAndDelete(req.params.id);
    if (!ligne) {
      return res.status(404).json({ message: "❌ Ligne de commande à supprimer non trouvée" });
    }
    res.json({ message: "✅ Ligne de commande supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ message: "❌ Échec de la suppression", error: err.message });
  }
};
