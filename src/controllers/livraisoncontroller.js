const Livraison = require("../models/Livraison");

// ✅ Créer une nouvelle livraison
exports.createLivraison = async (req, res) => {
  try {
    const livraison = new Livraison({
    ...req.body,
    client: req.user._id
    });
    await livraison.save();
  
    res.status(201).json({
      message: "✅ Livraison créée avec succès",
      livraison,
    });
  } catch (err) {
    res.status(400).json({
      message: "❌ Échec de la création de la livraison",
      error: err.message,
    });
  }
};
 

// 📋 Obtenir toutes les livraisons
exports.getAllLivraisons = async (req, res) => {
  try {
    const livraisons = await Livraison.find();
    res.json({
      message: "✅ Liste des livraisons récupérée avec succès",
      livraisons,
    });
  } catch (err) {
    res.status(500).json({
      message: "❌ Erreur lors de la récupération des livraisons",
      error: err.message,
    });
  }
};

// 🔍 Obtenir une livraison par ID
exports.getLivraisonById = async (req, res) => {
  try {
    const livraison = await Livraison.findById(req.params.id);
    if (!livraison) {
      return res.status(404).json({ message: "❌ Livraison non trouvée" });
    }
    res.json({
      message: "✅ Livraison trouvée avec succès",
      livraison,
    });
  } catch (err) {
    res.status(500).json({
      message: "❌ Erreur lors de la recherche de la livraison",
      error: err.message,
    });
  }
};

// ✏️ Mettre à jour une livraison
exports.updateLivraison = async (req, res) => {
  try {
    const livraison = await Livraison.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!livraison) {
      return res.status(404).json({ message: "❌ Livraison à modifier non trouvée" });
    }
    res.json({
      message: "✅ Livraison mise à jour avec succès",
      livraison,
    });
  } catch (err) {
    res.status(400).json({
      message: "❌ Échec de la mise à jour de la livraison",
      error: err.message,
    });
  }
};

// 🗑️ Supprimer une livraison
exports.deleteLivraison = async (req, res) => {
  try {
    const livraison = await Livraison.findByIdAndDelete(req.params.id);
    if (!livraison) {
      return res.status(404).json({ message: "❌ Livraison à supprimer non trouvée" });
    }
    res.json({ message: "✅ Livraison supprimée avec succès" });
  } catch (err) {
    res.status(500).json({
      message: "❌ Échec de la suppression de la livraison",
      error: err.message,
    });
  }
};
// ✅ Voir les livraison du client connecté
exports.getMyLivraisons = async (req, res) => {
  try {
    const livraisons = await Livraison.find({ client: req.user._id }).sort({ datelivraison: -1 });

    res.status(200).json({
      message: " Vos livraisons récupérées avec succès",
      livraisons,
    });
  } catch (err) {
    res.status(500).json({
      message: " Erreur lors de la récupération des commandes du client",
      error: err.message,
    });
  }
};
