const express = require("express");
const router = express.Router();
const rapportController = require("../controllers/rapportController");
const { authenticateToken, authByRole } = require("../middlewares/auth");

// Route pour créer une vente (seulement fournisseur connecté)
router.post('/vente', authenticateToken, authByRole('fournisseur'), rapportController.creerVente);

// Route pour obtenir les statistiques de ventes du fournisseur connecté
router.get('/mesventes', authenticateToken, authByRole('fournisseur'), rapportController.getMesVentes);

router.post("/",authenticateToken,authByRole("admin"), rapportController.createRapport);
router.get("/", rapportController.getAllRapports);

router.put("/:id", rapportController.updateRapport);
router.delete("/:id", rapportController.deleteRapport);
router.get("/:id", rapportController.getRapportById);
module.exports = router;
