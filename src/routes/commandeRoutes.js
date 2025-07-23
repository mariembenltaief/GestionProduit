const express = require("express");
const router = express.Router();
const commandeController = require("../controllers/commandeController");
const { authenticateToken, authByRole } = require("../middlewares/auth");

router.get("/mescommandes",authenticateToken , authByRole("client"), commandeController.getMyCommandes);
router.post("/",authenticateToken,authByRole("client"), commandeController.createCommande);
router.get("/",authenticateToken, authByRole("admin","fournisseur"), commandeController.getAllCommandes);
router.get("/:id", commandeController.getCommandeById);
router.put("/:id", commandeController.updateCommande);
router.delete("/:id", commandeController.deleteCommande);

module.exports = router;
