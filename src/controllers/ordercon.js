const Order = require('../models/Order');

const getOrder = async (req, res) => {
  try {
    const Order = await Order.find();
    res.json(Order);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
const createOrder= async (req, res) => {
  const { name, paiement ,date} = req.body;
  try {
    const Order = new Order({name, paiement ,date });
    await Order.save();
    res.status(201).json(Order);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création' });
  }
};

module.exports = { getOrder, createOrder};



