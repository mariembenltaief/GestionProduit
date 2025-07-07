const express = require('express');
const router = express.Router();
const { getReport, createReport} = require('../controllers/ReportController');

router.get('/', getReport);
router.post('/', createReport);

module.exports = router;

