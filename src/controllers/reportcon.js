const Report = require('../models/Report');

const getReport = async (req, res) => {
  try {
    const Report = await Report.find();
    res.json(Report);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
const createReport= async (req, res) => {
  const { type,period,contenupdf} = req.body;
  try {
    const Report = new Report({ type,period,contenupdf});
    await Report.save();
    res.status(201).json(Report);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création' });
  }
};

module.exports = { getReport, createReport};



