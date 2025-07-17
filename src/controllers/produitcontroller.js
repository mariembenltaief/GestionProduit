const Produit = require("../models/Produit");

// ✅ Créer un nouveau produit
exports.createProduit = async (req, res) => {
  try {
    const produit = new Produit(req.body);
    await produit.save();
    res.status(201).json({
      message: "✅ Produit créé avec succès",
      produit,
    });
  } catch (err) {
    res.status(400).json({ message: "❌ Échec de la création du produit", error: err.message });
  }
};

// 📄 Obtenir tous les produits
exports.getAllProduits = async (req, res) => {
  try {
    const produits = await Produit.find();
    res.json({
      message: "✅ Liste des produits récupérée avec succès",
      produits,
    });
  } catch (err) {
    res.status(500).json({ message: "❌ Erreur lors de la récupération des produits", error: err.message });
  }
};

// 🔍 Obtenir un produit par ID
exports.getProduitById = async (req, res) => {
  try {
    const produit = await Produit.findById(req.params.id);
    if (!produit) {
      return res.status(404).json({ message: "❌ Produit non trouvé" });
    }
    res.json({
      message: "✅ Produit trouvé avec succès",
      produit,
    });
  } catch (err) {
    res.status(500).json({ message: "❌ Erreur lors de la recherche du produit", error: err.message });
  }
};

// ✏️ Mettre à jour un produit
exports.updateProduit = async (req, res) => {
  try {
    const produit = await Produit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!produit) {
      return res.status(404).json({ message: "❌ Produit à modifier non trouvé" });
    }
    res.json({
      message: "✅ Produit mis à jour avec succès",
      produit,
    });
  } catch (err) {
    res.status(400).json({ message: "❌ Échec de la mise à jour du produit", error: err.message });
  }
};

// 🗑️ Supprimer un produit
exports.deleteProduit = async (req, res) => {
  try {
    const produit = await Produit.findByIdAndDelete(req.params.id);
    if (!produit) {
      return res.status(404).json({ message: "❌ Produit à supprimer non trouvé" });
    }
    res.json({ message: "✅ Produit supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "❌ Échec de la suppression du produit", error: err.message });
  }
};
