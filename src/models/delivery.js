const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema({
  dateExpedition: { type: Date, default: Date.now },
  datelivraisonPreuve: {type: date},
  datelivraisoneffective: {type: date},
  status: { type: String ,enum:['en transit','livrée','en attente']},
  note :{ type:Number},
  signatureclient: {type:String}

});

module.exports = mongoose.model('Delivery', DeliverySchema);

