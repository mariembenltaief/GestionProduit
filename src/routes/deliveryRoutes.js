const express = require('express');
const router = express.Router();
const { getDelivery, createDelivery } = require('../controllers/DeliveryController');

router.get('/', getDelivery);
router.post('/', createDelivery);

module.exports = router;

