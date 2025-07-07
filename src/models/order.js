const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
 orderNumber: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  status: { type: String },
  total: { type: Number, required: true },
  taxes: { type: Number },
  adresse: { type:String},
  modepaiement :{type:String}

});

module.exports = mongoose.model('Order', OrderSchema);

