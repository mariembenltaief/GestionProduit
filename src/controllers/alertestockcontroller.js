const AlerteStock = require("../models/AlerteStock");

exports.createAlerte = async (req, res) => {
  try {
    const alerte = new AlerteStock(req.body);
    await alerte.save();
    res.status(201).json(alerte);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllAlertes = async (req, res) => {
  try {
    const alertes = await AlerteStock.find().populate("idProduit");
    res.json(alertes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAlerteById = async (req, res) => {
  try {
    const alerte = await AlerteStock.findById(req.params.id).populate("idProduit");
    if (!alerte) return res.status(404).json({ message: "Alerte non trouvée" });
    res.json(alerte);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateAlerte = async (req, res) => {
  try {
    const alerte = await AlerteStock.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(alerte);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteAlerte = async (req, res) => {
  try {
    await AlerteStock.findByIdAndDelete(req.params.id);
    res.json({ message: "Alerte supprimée" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
