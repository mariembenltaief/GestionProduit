const express = require("express");
const router = express.Router();
const ligneCommandeController = require("../controllers/ligneCommandeController");

router.post("/", ligneCommandeController.createLigneCommande);
router.get("/", ligneCommandeController.getAllLignes);
router.get("/:id", ligneCommandeController.getLigneById);
router.put("/:id", ligneCommandeController.updateLigne);
router.delete("/:id", ligneCommandeController.deleteLigne);

module.exports = router;
