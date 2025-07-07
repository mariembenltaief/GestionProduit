const AlertStock = require('../models/AlertStock');

const AlertStock= async (req, res) => {
  try {
    const AlertStock = await Report.find();
    res.json(Report);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
const createAlertStock= async (req, res) => {
  const { seuil,date,statut} = req.body;
  try {
    const AlertStock = new AlertStock({ seuil,date,statut});
    await AlertStock.save();
    res.status(201).json(AlertStock);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création' });
  }
};

module.exports = { getAlertStock, createAlertStock};



