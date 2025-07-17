const express = require("express");
const router = express.Router();
const alerteStockController = require("../controllers/alerteStockController");

router.post("/", alerteStockController.createAlerte);
router.get("/", alerteStockController.getAllAlertes);
router.get("/:id", alerteStockController.getAlerteById);
router.put("/:id", alerteStockController.updateAlerte);
router.delete("/:id", alerteStockController.deleteAlerte);

module.exports = router;
