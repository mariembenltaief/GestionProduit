const express = require("express");
const router = express.Router();
const rapportController = require("../controllers/rapportController");

router.post("/", rapportController.createRapport);
router.get("/", rapportController.getAllRapports);
router.get("/:id", rapportController.getRapportById);
router.put("/:id", rapportController.updateRapport);
router.delete("/:id", rapportController.deleteRapport);

module.exports = router;
