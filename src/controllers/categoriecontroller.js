const Categorie = require("../models/Categorie");

// ➕ Créer une catégorie
exports.createCategorie = async (req, res) => {
  try {
    const categorie = new Categorie(req.body);
    await categorie.save();
    res.status(201).json({ 
      message: "Catégorie ajoutée avec succès", 
      data: categorie 
    });
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de la création", error: err.message });
  }
};

// 📋 Obtenir toutes les catégories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Categorie.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// 🔍 Obtenir une catégorie par ID
exports.getCategorieById = async (req, res) => {
  try {
    const categorie = await Categorie.findById(req.params.id);
    if (!categorie) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }
    res.json(categorie);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// ✏️ Modifier une catégorie
exports.updateCategorie = async (req, res) => {
  try {
    const categorie = await Categorie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!categorie) {
      return res.status(404).json({ message: "Catégorie à modifier non trouvée" });
    }
    res.json({ 
      message: "Catégorie mise à jour avec succès", 
      data: categorie 
    });
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de la mise à jour", error: err.message });
  }
};

// 🗑 Supprimer une catégorie
exports.deleteCategorie = async (req, res) => {
  try {
    const categorie = await Categorie.findByIdAndDelete(req.params.id);
    if (!categorie) {
      return res.status(404).json({ message: "Catégorie à supprimer non trouvée" });
    }
    res.json({ message: `Catégorie '${categorie.nomCategorie}' supprimée avec succès` });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
