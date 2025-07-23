const Rapport = require("../models/Rapport");

// ✅ Créer un rapport
exports.createRapport = async (req, res) => {
  try {
    const rapport = new Rapport(req.body);
    await rapport.save();
    res.status(201).json({
      message: "✅ Rapport créé avec succès",
      rapport,
    });
  } catch (err) {
    res.status(400).json({
      message: "❌ Échec de la création du rapport",
      error: err.message,
    });
  }
};

// 📋 Obtenir tous les rapports
exports.getAllRapports = async (req, res) => {
  try {
    const rapports = await Rapport.find();
    res.json({
      message: "✅ Liste des rapports récupérée avec succès",
      rapports,
    });
  } catch (err) {
    res.status(500).json({
      message: "❌ Erreur lors de la récupération des rapports",
      error: err.message,
    });
  }
};

// 🔍 Obtenir un rapport par ID
exports.getRapportById = async (req, res) => {
  try {
    const rapport = await Rapport.findById(req.params.id);
    if (!rapport) {
      return res.status(404).json({ message: "❌ Rapport non trouvé" });
    }
    res.json({
      message: "✅ Rapport trouvé avec succès",
      rapport,
    });
  } catch (err) {
    res.status(500).json({
      message: "❌ Erreur lors de la recherche du rapport",
      error: err.message,
    });
  }
};

// ✏️ Mettre à jour un rapport
exports.updateRapport = async (req, res) => {
  try {
    const rapport = await Rapport.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!rapport) {
      return res.status(404).json({ message: "❌ Rapport à modifier non trouvé" });
    }
    res.json({
      message: "✅ Rapport mis à jour avec succès",
      rapport,
    });
  } catch (err) {
    res.status(400).json({
      message: "❌ Échec de la mise à jour du rapport",
      error: err.message,
    });
  }
};

// 🗑️ Supprimer un rapport
exports.deleteRapport = async (req, res) => {
  try {
    const rapport = await Rapport.findByIdAndDelete(req.params.id);
    if (!rapport) {
      return res.status(404).json({ message: "❌ Rapport à supprimer non trouvé" });
    }
    res.json({ message: "✅ Rapport supprimé avec succès" });
  } catch (err) {
    res.status(500).json({
      message: "❌ Erreur lors de la suppression du rapport",
      error: err.message,
    });
  }
};
const Vente = require('../models/Vente');

// Création d'une vente (route POST)
exports.creerVente = async (req, res) => {
  try {
    const { produit, quantite, prixUnitaire } = req.body;
    const fournisseur = req.user._id;

    const vente = new Vente({
      produit,
      quantite,
      prixUnitaire,
      fournisseur
    });

    await vente.save();
    res.status(201).json({ message: 'Vente créée', vente });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Statistiques dynamiques pour le fournisseur connecté (route GET)
exports.getMesVentes = async (req, res) => {
  try {
    const fournisseurId = req.user._id;

    // Total commandes (nombre de ventes)
    const totalCommandes = await Vente.countDocuments({ fournisseur: fournisseurId });

    // Total produits vendus (somme des quantités)
    const totalProduitsVendusAgg = await Vente.aggregate([
      { $match: { fournisseur: fournisseurId } },
      { $group: { _id: null, totalQuantite: { $sum: '$quantite' } } }
    ]);
    const totalProduitsVendus = totalProduitsVendusAgg[0]?.totalQuantite || 0;

    // Chiffre d'affaires (somme prixUnitaire * quantite)
    const chiffreAffairesAgg = await Vente.aggregate([
      { $match: { fournisseur: fournisseurId } },
      { $group: { _id: null, totalCA: { $sum: { $multiply: ['$prixUnitaire', '$quantite'] } } } }
    ]);
    const chiffreAffaires = chiffreAffairesAgg[0]?.totalCA || 0;

    res.json({
      message: `Statistiques de ventes pour le fournisseur ${req.user.nom}`,
      totalCommandes,
      totalProduitsVendus,
      chiffreAffaires
    });

  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
};

