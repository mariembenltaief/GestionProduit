const Product = require('../models/Product');

const getProduct = async (req, res) => {
  try {
    const Product = await Product.find();
    res.json(Product);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
const createProduct = async (req, res) => {
  const { name, description , price , quantityStock ,type ,imageURL,date , order } = req.body;
  try {
    const Product = new Product({ name, email });
    await Product.save();
    res.status(201).json(Product);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création' });
  }
};

module.exports = { getProduct, createProduct };



