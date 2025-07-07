const mongoose = require('mongoose');

const RapportSchema = new mongoose.Schema({
  typeRapport: {type: date,required},
  dateGen: {type: date, default:Date.now},
  periode :{type:String},
  contenuPdf :{type:String}
  

});

module.exports = mongoose.model('Delivery', DeliverySchema);

