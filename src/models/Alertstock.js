const mongoose = require('mongoose');

const AlertstockSchema = new mongoose.Schema({
 dateAlerte: {type: date, default:Date.now},
  seuil : {type:String},
  statutAlerte :{type:String, enum :['active','resolue'],default:'active'}
  

});

module.exports = mongoose.model('Alertstock', AlertstockSchema);

