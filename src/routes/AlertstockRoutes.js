const express = require('express');
const router = express.Router();
const { getAlertstock, createAlertstock} = require('../controllers/AlertstockController');

router.get('/', getAlertstock);
router.post('/', createAlertstock);

module.exports = router;

