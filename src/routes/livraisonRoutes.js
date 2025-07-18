const express = require("express");
const router = express.Router();
const livraisonController = require("../controllers/livraisonController");
const { authenticateToken, authByRole } = require("../middlewares/auth");

router.get("/meslivraisons",authenticateToken , authByRole("client"), livraisonController.getMyLivraisons);
router.post("/",authenticateToken , authByRole("client"), livraisonController.createLivraison);
router.get("/",authenticateToken,authByRole("admin"), livraisonController.getAllLivraisons);
router.get("/:id", livraisonController.getLivraisonById);
router.put("/:id", livraisonController.updateLivraison);
router.delete("/:id", livraisonController.deleteLivraison);

module.exports = router;
