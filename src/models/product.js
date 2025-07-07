const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  price:{type:Number,required:true,trim:true},
  description: { type: String },
  stockQuantity: { type: Number, required: true },
  type: { type: String },
  imageURL: { type: String },
  dateAdded: { type: Date},
  status: { type: String, enum: ['disponible', 'en rupture', 'archivé'], default: 'disponible' }
 
});

module.exports = mongoose.model('Product', ProductSchema);

