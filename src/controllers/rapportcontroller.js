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
