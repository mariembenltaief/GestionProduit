const express = require("express");
const router = express.Router();
const rapportController = require("../controllers/rapportController");
const { authenticateToken, authByRole } = require("../middlewares/auth");

router.post("/",authenticateToken,authByRole("admin"), rapportController.createRapport);
router.get("/", rapportController.getAllRapports);
router.get("/:id", rapportController.getRapportById);
router.put("/:id", rapportController.updateRapport);
router.delete("/:id", rapportController.deleteRapport);

module.exports = router;
