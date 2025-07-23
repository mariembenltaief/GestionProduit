const express = require("express");
const router = express.Router();
const alerteStockController = require("../controllers/alerteStockController");
const { authenticateToken, authByRole } = require("../middlewares/auth");

router.post("/", alerteStockController.createAlerte);
router.get("/",authenticateToken,authByRole("admin"), alerteStockController.getAllAlertes);
router.get("/:id", alerteStockController.getAlerteById);
router.put("/:id",authenticateToken,authByRole("admin"), alerteStockController.updateAlerte);
router.delete("/:id", alerteStockController.deleteAlerte);

module.exports = router;
