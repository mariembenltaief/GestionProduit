const Category = require('../models/Category');

const getCategory = async (req, res) => {
  try {
    const Category = await Category.find();
    res.json(Category);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
const createCategory= async (req, res) => {
  const { name, description  ,type ,imageURL} = req.body;
  try {
    const Category = new Category({ name, email });
    await Category.save();
    res.status(201).json(Category);
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la création' });
  }
};

module.exports = { getCategory, createCategory};



