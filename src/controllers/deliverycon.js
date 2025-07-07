const Delivery = require('../models/Delivery');

const getDelivery = async (req, res) => {
  try {
    const Category = await Category.find();
    res.json(Delivery);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
const createDelivery= async (req, res) => {
  const { name,date,statut,note} = req.body;
  try {
    const Delivery = new Delivery({ name,date,statut,note });
    await Delivery.save();
    res.status(201).json(Delivery);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création' });
  }
};

module.exports = { getDelivery, createDelivery};



